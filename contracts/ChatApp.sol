// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    // user stract
    struct user{
        string name;
        friend[] friendList;
    }
    struct friend{
        address pubkey;
        string name;
    }
    struct message{
        address sender;
        uint timestamp;
        string msg;
    }
    struct AllUserStruck{
        string name;
        address accountAddress;
    }
    AllUserStruck[] getAllUsers;

    mapping (address => user) userList;
    mapping (bytes32 => message[]) allMessage;

    // Check User_Exists
    function checkUserExists(address pubkey)public view returns (bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    //Create Account
    function createAccount(string calldata name) external  {
        require(checkUserExists(msg.sender)==false, "user Already Exists");
        require(bytes(name).length>0,"User name cannot Empty");

        userList[msg.sender].name = name;

        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    //get UserName
    function getUserName(address pubkey)external view returns (string memory){

    }
    // check checkAlreadyFriends
    // function checkAlreadyFriends(address pubkey1, address pubkey2) public   view  returns (bool){
    //     if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
    //         address tmp = pubkey1;
    //         pubkey1=pubkey2;
    //         pubkey2=tmp;
    //     }

    //     for(uint i=0;i<userList[pubkey1].friendList.length; i++){
    //         if(userList[pubkey1].friendList[1].pubkey == pubkey2){
    //             return true;
    //         }
    //     }
    //     return false;
    // }
 
    
  
    // add friend
    function _addFriend(address me, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key,name);
        userList[me].friendList.push(newFriend);
    }

    //ADD Friends
    function addFriend(address friend_key, string calldata name)external {
        require(checkUserExists(msg.sender), "first you can create an account");
        require(checkUserExists(friend_key), "User isnot register");
        require(msg.sender != friend_key,"User cannot add themselve");
        // require(checkAlreadyFriends(msg.sender,friend_key),"ok");
       

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

  
    

    // get my friend
    function getMyFriend() external  view returns (friend[] memory){
        return userList[msg.sender].friendList;
    }

    // Get Chat Code
    function _getChatCode(address pubkey1, address pubkey2)internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        }else{
            return  keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    // Send Message
    function sendMessage(address friend_key, string calldata _msg)external {
        require(checkUserExists(msg.sender), "Create an Account");
        require(checkUserExists(friend_key),"User is not exits");
        // require(checkAlreadyFriends(msg.sender,friend_key), " you are not friend with yhe given usr");

        bytes32 chatCode = _getChatCode(msg.sender,friend_key);
        message memory newMsg = message(msg.sender,block.timestamp, _msg);
        allMessage[chatCode].push(newMsg);
    }
    
    //Read Message
    function readMessage(address friend_key)external view returns (message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender,friend_key);
        return allMessage[chatCode];
    }

    // GET All USers
    function getAllUser()public  view  returns (AllUserStruck[] memory){
        return getAllUsers;
    }
}

