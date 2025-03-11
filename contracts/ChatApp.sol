// SPDX-License-Identifer: MIT

pragma solidity >=0.7.0 < 0.9.0;

contract ChatApp{
    //user custom type
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

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //check if user exist
    function checkUserExists(address pubkey) public view returns (bool){
        return bytes(userList[pubkey].name).length > 0;

    }
    //create account
    function createAccount(string calldata name_)external {
        require(checkUserExists(msg.sender)== false, "user already exists");
        require(bytes(name_).length > 0, "username cannot be empty");
        userList[msg.sender].name = name_;
    }

    //get username
    function getUsername(address pubkey_) external view returns( string memory){
        require(checkUserExists(pubkey_), "User is not registered");
        return userList[pubkey_].name;
    }

    // add friends
    function addFriend(address friend_key, string calldata name) external{
        require(checkUserExists(msg.sender), "create an account");
        require(checkUserExists(friend_key), "user is not registered");
        require(msg.sender != friend_key, "user cannot add themselves as a friend");
        require(checkAlreadyFriends(msg.sender, friend_key)== false, "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);

    }

    //check already friends

    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool){
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp= pubkey1;
            pubkey1 = pubkey2;
            pubkey2= tmp;
        }
        for (uint256 i= 0; i < userList[pubkey1].friendList.length; i++){
            if(userList[pubkey1].friendList[i].pubkey = pubkey2) return true;
        }
        return false;
    }


    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //get my friends
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    //get chat code
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(byte32){
        
    }



}
