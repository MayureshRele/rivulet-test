import { Module, Mutation, VuexModule, Action } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { IProduct } from '../../interface/IProduct'
import store from "..";

@Module
export default class ProductModule extends VuexModule implements IProduct {
    id = 0;
    name = "";
    description = "";
    image = "";
    qty = 0
    price = 0
    ProductList: IProduct[] = [];
    SelectedProduct: IProduct[] = [];
    CartCount = 0;
    SearchQueryData = ""

    /**
     * Authenticate user
     * @returns User
     */

    get products(): IProduct[] {
        return this.ProductList
    }

    get cartList(): IProduct[] {
        return this.SelectedProduct
    }

    get CartQtyCount() {
        return this.CartCount
    }

    get GetSearchQueryData() {
        return this.SearchQueryData
    }

    @Mutation
    [Mutations.SET_PRODUCT](data: IProduct) {
        this.ProductList.push(data);
    }
    @Mutation
    [Mutations.SET_CART](data: IProduct) {

        if (this.SelectedProduct.length === 0) {
            data.qty = this.SelectedProduct.length + 1
            this.SelectedProduct.push(data)
        } else {
            const ifExists = this.SelectedProduct.filter((element) => {
                return element.name.toLowerCase().includes(data.name.toLowerCase())
            })

            if (ifExists.length === 0) {
                data.qty += 1
                this.SelectedProduct.push(data)
            } else {
                ifExists[0].qty += 1
            }
        }
    }
    @Mutation
    [Mutations.SET_SEARCH_QUERY](data: string) {
        this.SearchQueryData = data;
    }

    @Mutation
    [Mutations.SET_CART_COUNT]() {
        this.CartCount += 1
    }

    @Mutation
    [Mutations.SET_REMOVE_FROM_CART](data: IProduct) {
        this.SelectedProduct.forEach((element) => {
            if (data.id === element.id) {
                if (data.qty === 1) {
                    this.SelectedProduct.splice(this.SelectedProduct.findIndex(product => product.id === data.id), 1)
                } else {
                    element.qty -= 1
                }
                this.CartCount -= 1
            }
        })
    }

    @Mutation
    [Mutations.SET_REMOVE_PRODUCT](data: IProduct) {
        this.ProductList.splice(this.ProductList.findIndex(product => product.id === data.id), 1)
        this.SelectedProduct.splice(this.SelectedProduct.findIndex(product => product.id === data.id), 1)
        this.CartCount = this.SelectedProduct.length === 0 ? 0 : this.CartCount - data.qty
    }


    @Mutation
    [Mutations.SET_EMPTY_CART]() {
        this.SelectedProduct = []
        this.CartCount = 0
    }

    @Action
    [Actions.ADD_PRODUCT](payload: IProduct) {
        if (payload) {
            payload.id = this.ProductList.length + 1;
            this.context.commit(Mutations.SET_PRODUCT, payload);
        }
    }

    @Action
    [Actions.EDIT_PRODUCT](payload: IProduct) {
        if (payload) {
            this.ProductList.map((ele) => ele.id === payload.id ? { ...payload } : ele)
        }
    }

    @Action
    [Actions.ADD_TO_CART](payload: IProduct) {
        if (payload) {
            this.context.commit(Mutations.SET_CART, payload);
        }
    }

    @Action
    [Actions.ADD_CART_COUNT]() {
        this.context.commit(Mutations.SET_CART_COUNT);
    }

    @Action
    [Actions.SEARCH_QUERY](payload: string) {
        this.context.commit(Mutations.SET_SEARCH_QUERY, payload);
    }

    @Action
    [Actions.REMOVE_FROM_CART](payload: IProduct) {
        store.commit(Mutations.SET_REMOVE_FROM_CART, payload)
    }

    @Action
    [Actions.DELETE_PRODUCT](payload: IProduct) {
        store.commit(Mutations.SET_REMOVE_PRODUCT, payload)
    }

    @Action
    [Actions.EMPTY_CART]() {
        store.commit(Mutations.SET_EMPTY_CART)
    }
}