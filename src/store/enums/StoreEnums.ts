enum Actions {
    LOGIN_USER = "LoginUser",
    ADD_PRODUCT = "AddProduct",
    EDIT_PRODUCT = "EditProduct",
    LOGOUT = "LogoutUser",
    ADD_TO_CART = "AddToCart",
    REMOVE_FROM_CART = "RemoveFromCart",
    IS_MODAL = "IsModal",
    ADD_CART_COUNT = "AddCartCount",
    SEARCH_QUERY = "SearchQuery",
    DELETE_PRODUCT = "RemoveProduct",
    EMPTY_CART = "EmptyCart"
}

enum Mutations {
    SET_USER = "SetUser",
    SET_PRODUCT = "SetProduct",
    REMOVE_USER = "RemoveUser",
    SET_CART = "SetCart",
    SET_MODAL = "SetModal",
    SET_CART_COUNT = "SetCartCount",
    SET_SEARCH_QUERY = "SetSearchQuery",
    SET_LOGOUT_USER = "SetLogOut",
    SET_REMOVE_FROM_CART = "SetRemoveFromCart",
    SET_REMOVE_PRODUCT = "SetRemoveProduct",
    SET_EMPTY_CART = "SetEmptyCart"
}

export { Actions, Mutations };