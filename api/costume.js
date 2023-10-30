import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addCostume = async ({ userId, name, costume, costumeDescription, adultOrChild }) => {
  try {
    await addDoc(collection(db, "costume"), {
      user: userId,
      name,  // Name of the person
      costume,  // Name of the costume
      costumeDescription,  // Description of the costume
      adultOrChild,  // Whether it's for an adult or child
      createdAt: new Date().getTime(),
    });
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

const toggleCostumeStatus = async ({ docId, status }) => {
  try {
    const costumeRef = doc(db, "costume", docId);
    await updateDoc(costumeRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteCostume = async (docId) => {
  try {
    const costumeRef = doc(db, "costume", docId);
    await deleteDoc(costumeRef);
  } catch (err) {
    console.log(err);
  }
};

export { addCostume, toggleCostumeStatus, deleteCostume };
