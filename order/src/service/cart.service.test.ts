import { cartService } from '.';
import { CartRepositoryType } from "../repository/cart.repository";
import { cartRepository } from "../repository"
describe("cartService", () => {
    let repo:CartRepositoryType
    beforeEach(()=>{
        repo = cartRepository.CartRepository
    })
    afterEach(()=>{
        repo = {} as CartRepositoryType
    })

    it("should return correct data while creating cart",async ()=>{
        const id = 1
        const mockCart = {
            productId: 1,
            qty: 100,
            customerId:id
        } 
        jest.spyOn(cartRepository.CartRepository, 'createCart').mockResolvedValueOnce(id as number)
        const res = await cartService.CreateCart(mockCart,repo)
        expect(res).toEqual({
            message:"fake cart repository",
            input:mockCart
        })
    })
})