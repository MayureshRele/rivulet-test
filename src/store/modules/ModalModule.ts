import { Module, Mutation, VuexModule, Action } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

@Module
export default class ModalModule extends VuexModule {
  isOpen = false;
  /**
   * Authenticate user
   * @returns User
   */

  get Ismodal() {
    return this.isOpen;
  }

  @Mutation
  [Mutations.SET_MODAL](data: any) {
    this.isOpen = data.isOpen;
  }

  @Action
  [Actions.IS_MODAL](payload: any) {
    this.context.commit(Mutations.SET_MODAL, payload);
  }
}
