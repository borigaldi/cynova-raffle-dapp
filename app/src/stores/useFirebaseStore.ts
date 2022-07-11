import create from "zustand";
import {
  getFirestore,
  collection,
  query,
  doc,
  limit,
  onSnapshot,
  addDoc,
  updateDoc,
  orderBy
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { notify } from "../utils/notifications";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "<API_KEY>",
  // authDomain: "<PROJECT_ID>.firebaseapp.com",
  // databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  // projectId: "<PROJECT_ID>",
  // storageBucket: "<BUCKET>.appspot.com",
  // messagingSenderId: "<SENDER_ID>",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useFirebaseStore = create((set, _get) => ({
  bids: [],
  listing: [],
  topBidder: [],
  getBids: () => {
    onSnapshot(collection(db, "solbids"), (snapshot) => {
      set({ bids: snapshot.docs.map((doc) => doc.data()) });
    });
  },
  placeBid: async (amount: any, publicKey: any) => {
    const docRef = await addDoc(collection(db, "solbids"), {
      bidAmount: amount,
      wallet: publicKey,
    });
    if (docRef.id) {
      console.log("bid placed>>: ", docRef.id);
    }
  },
  listBid: (amount: any, publicKey: any, description: any, Nftname: any, url: any, minIncrease: any) => {
    set({ loader: true });
    console.log("adding: ");
    let data = {
      wallet: publicKey.toBase58(),
      description: description,
      name: Nftname,
      state: true,
      url: url,
      bidAmount: amount,
      minIncrease: minIncrease,
    };
    updateDoc(doc(db, "sollistings", "solnft"), data).then(
      (notify as any)({ type: "success", message: `Listing update successful!!` })
    );
  },
  getListings: () => {
    onSnapshot(collection(db, "sollistings"), (snapshot) => {
      set({ listing: snapshot.docs.map((doc) => doc.data()) });
    });
  },
  stopAuction: async () => {
    let data = {
      state: false,
    };
    await updateDoc(doc(db, "sollistings", "solnft"), data).then(
      (notify as any)({ type: "success", message: `Bid Closed successful!!` })
    );
  },
  winner: () => {
    onSnapshot(query(collection(db, "solbids"),orderBy("bidAmount", "desc"), limit(1)), (snapshot) => {
      set({ topBidder: snapshot.docs.map((doc) => doc.data()) });
    });
  },

}));
