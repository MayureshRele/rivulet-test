import { Module, Mutation, VuexModule, Action } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
interface IUserDetails {
    id: number,
    email: string,
    name: string,
    isAuthenticated: boolean,
}
@Module
export default class AuthModule extends VuexModule implements IUserDetails {
    id = 0;
    email = ""
    name = ""
    isAuthenticated = false;
    userDetails = {} as IUserDetails;

    /**
     * Authenticate user
     * @returns User
     */

    get currentUser() {
        return this.userDetails
    }

    @Mutation
    [Mutations.SET_USER](data: IUserDetails) {
        this.userDetails.id = data.id;
        this.userDetails.email = data.email;
        this.userDetails.name = data.name;
        this.userDetails.isAuthenticated = data.isAuthenticated;
    }

    @Mutation
    [Mutations.REMOVE_USER]() {
        this.userDetails.id = 0;
        this.userDetails.email = "";
        this.userDetails.name = "";
        this.userDetails.isAuthenticated = false;
    }

    @Action
    [Actions.LOGIN_USER](payload: IUserDetails) {
        if (payload) {
            this.context.commit(Mutations.SET_USER, payload);
        }
    }

    @Action
    [Actions.LOGOUT]() {
        this.context.commit(Mutations.REMOVE_USER);
        this.context.commit(Mutations.SET_EMPTY_CART);
    }

}