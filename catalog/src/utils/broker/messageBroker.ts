import { Consumer, Kafka,logLevel, Partitioners, Producer } from "kafkajs";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.type";
import { MessageType, CatalogEvent, TOPIC_TYPE } from "../../types";


// configuration properties kafka
const CLIENT_ID = process.env.CLIENT_ID || 'catalog-service'
const GROUP_ID = process.env.GROUP_ID || 'catalog-service-group'
const BROKERS = [process.env.BROKERS_1 || 'localhost:9092']

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: BROKERS,
    logLevel: logLevel.INFO
})

let producer:Producer;
let consumer:Consumer;

// create topic
const createTopic  = async (topic:string[])=>{
    const topics = topic.map((t)=>({
        topic:t,
        numPartitions:2,
        replicationFactor:1
    }))

    const admin = kafka.admin()
    await admin.connect()
    const topicExists = await admin.listTopics()
    for (const t of topics){
        if(!topicExists.includes(t.topic)){
            await admin.createTopics({
                topics:[t]
            })
        }
    }
    await admin.disconnect()
}

const connectProducer = async <T>(): Promise<T> =>{
    await createTopic(['OrderEvents'])
    if(!producer){
        console.log('producer not exist before')
        producer = kafka.producer()
    }
    producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner,
         retry: {
            initialRetryTime: 1000,
            retries: 10
        }
    })

     try {
        await producer.connect()
        console.log('Kafka Producer connected successfully.')
    } catch (error) {
        console.error('Failed to connect Kafka Producer:', error)
    }
    return producer as unknown as T
}

const disconnectProducer = async (): Promise<void> =>{
    if(producer) await producer.disconnect()
}

const publish = async (data: PublishType): Promise<boolean> =>{
   const producer = await connectProducer<Producer>()
   const result = await producer.send({
         topic:data.topic,
            messages:[
                {
                    headers:data.headers,
                    key:data.event,
                    value:JSON.stringify(data.message)
                }
            ]
   })
   
   return result.length>0
}

const connectConsumer = async <T>(): Promise<T> =>{
    if(consumer){
       return consumer as unknown as T
    }
    consumer = kafka.consumer({
        groupId: GROUP_ID,
        retry: {
            initialRetryTime: 1000,
            retries: 10
        }
    })
     try {
        await consumer.connect()
        console.log('Kafka Consumer connected successfully.')
    } catch (error) {
        console.error('Failed to connect Kafka Consumer:', error)
    }
    return consumer as unknown as T
}

const disconnectConsumer = async ():Promise<void> =>{
    if(consumer) await consumer.disconnect()
}

const subscribe = async (messageHandler: MessageHandler, topic: TOPIC_TYPE): Promise<void> =>{
    const consumer = await connectConsumer<Consumer>()
    await consumer.subscribe({
        topic:topic,
        fromBeginning:true
    })
    await consumer.run({
        eachMessage:async ({topic,partition,message})=>{
          if(!["CatalogEvents"].includes(topic)){
            return
          }
          if(message.key && message.value){
            const inputMessage:MessageType={
                headers:message.headers,
                event:message.key.toString() as CatalogEvent,
                data:message.value? JSON.parse(message.value.toString()) : null

            }
            await messageHandler(inputMessage)
            await consumer.commitOffsets([
                {
                    topic:topic,
                    partition:partition,
                    offset:(Number(message.offset)+1).toString()
                }
            ])
          }
        }
    })
}
export const MessageBroker: MessageBrokerType ={
    connectProducer,
    disconnectProducer,
    publish,
    connectConsumer,
    disconnectConsumer,
    subscribe
}