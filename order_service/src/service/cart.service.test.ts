import { cartService } from '../service';
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
        const mockCart = {
            title:"smart phone",
            amount:1200
        }
        jest.spyOn(cartRepository.CartRepository, 'create').mockResolvedValueOnce(()=>Promise.resolve({
            message:"fake cart repository",
            input:mockCart
        }))
        const res = await cartService.CreateCart(mockCart,repo)
        expect(res).toEqual({
            message:"fake cart repository",
            input:mockCart
        })
    })
})