// import { addDoc, collection } from "@firebase/firestore"
// import { firestore } from "./firebase_setup/firebase"

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();

//   const testCollectionRef = collection(firestore, "test") 

//   const data = {data: "ok"}

//   try {
//       addDoc(testCollectionRef, data)
//   } catch(err) {
//       console.log(err)
//   }

//   dataRef.current!.value = "";
// }