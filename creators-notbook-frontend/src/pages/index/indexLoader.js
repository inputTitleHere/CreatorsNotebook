import store from "../../redux-store/configureStore";

export default async function indexLoader() {
    const token = localStorage.getItem("token");
    const userStore = store.getState().user.payload;
    console.log(userStore);
    if(token && store.getState().user){

    }
    return null;
}
