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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export enum CollectionPathEnum {
  Bids = "solbids",
  Listings = "sollistings",
}

export enum MessagesEnum {
  ListingUpdateSuccess = `Listing update successful!!`,
  BidCloseSuccess = `Bid Closed successful!!`,
}

export const useFirebaseStore = create((set, _get) => ({
  bids: [],
  listing: [],
  topBidder: [],
  getBids: () => {
    onSnapshot(collection(db, CollectionPathEnum.Bids), (snapshot) => {
      set({ bids: snapshot.docs.map((doc) => doc.data()) });
    });
  },
  placeBid: async (amount: any, publicKey: any) => {
    const docRef = await addDoc(collection(db, CollectionPathEnum.Bids), {
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
    updateDoc(doc(db, CollectionPathEnum.Listings, "solnft"), data).then(
      (notify as any)({ type: "success", message: MessagesEnum.ListingUpdateSuccess })
    );
  },
  getListings: () => {
    onSnapshot(collection(db, CollectionPathEnum.Listings), (snapshot) => {
      set({ listing: snapshot.docs.map((doc) => doc.data()) });
    });
  },
  stopAuction: async () => {
    let data = {
      state: false,
    };
    await updateDoc(doc(db, CollectionPathEnum.Listings, "solnft"), data).then(
      (notify as any)({ type: "success", message: MessagesEnum.BidCloseSuccess })
    );
  },
  winner: () => {
    onSnapshot(
      query(
        collection(db, CollectionPathEnum.Bids),
        orderBy("bidAmount", "desc"),
        limit(1)
      ),
      (snapshot) => {
        set({ topBidder: snapshot.docs.map((doc) => doc.data()) });
      }
    );
  },

}));
