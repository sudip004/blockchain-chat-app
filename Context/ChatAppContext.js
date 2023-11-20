import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Internal import
import {
  CheckIfWalletConnected,
  connectWallet,
  connectWithContract,
} from "../Utils/apiFeature";

export const ChatAppContect = React.createContext();

export const ChatAppProvider = ({ children }) => {
  // USE STATE
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");

  // CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  // FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      // GET CONTRACT
      const contract = await connectWithContract();
      //   GET ACCOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      // GET USER NAME
      // const username = await contract.getUserName(connectAccount);
      // setUserName(username);
      // GET MY FRIEND LIST
      const FriendLists = await contract.getMyFriend();
      setFriendLists(FriendLists);
      // GET ALL APP USER LISTS
      const userList = await contract.getAllUser();
      setUserList(userList);
    } catch (error) {
      // setError("Please install and connect your Wallet");
    }
  };
// console.log(account);
  useEffect(() => {
    fetchData();
  }, []);

  //Read MEssage
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      // setError("currentlt No error Message");
      console.log("currentlt No error Message");
    }
  };
  // CREATE ACCOUNT
  const createAccount = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress)
      //   return setError("name and accountaddress please provide");

      const contract = await connectWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      console.log("account create successfully", getCreatedUser);
      setLoading(false);
      window.location.reload(); 
    } catch (error) {
      setError("Error while creating your account please reload ");
    }
  };
  //ADD FRIEND
  const addFriends = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress)
      //   return setError("Please provide name and address 82");

      const contract = await connectWithContract();
      console.log(name,accountAddress);
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      // send this to home page
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError("Something wrong while friend adding 84");
    }
  };
  // SEND MESSAGE TO YOUR FRIEND
  const sendMessage = async ({ msg, address }) => {
    try {
      // if (msg || address) return setError("please type your msg 98");
      const contract = await connectWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };
  // READ THE USER INFO
  const readUser = async (userAddress) => {
    try {
      const contract = await connectWithContract();
      const userName = await contract.getUserName(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (error) {
      setError("problem set user function");
    }
  };
  return (
    <ChatAppContect.Provider
      value={{ 
        readMessage, 
        createAccount,
         addFriends,
          sendMessage,
           readUser ,
           connectWallet,
           CheckIfWalletConnected,
           account,
           userName,
           friendLists,
           friendMsg,
           loading,
           userList,
           error,
           currentUserName,
           currentUserAddress
        }}
    >
      {children}
    </ChatAppContect.Provider>
  );
};
