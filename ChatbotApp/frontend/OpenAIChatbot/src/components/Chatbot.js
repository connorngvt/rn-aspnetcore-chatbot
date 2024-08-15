import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initialMessage = {
      _id: new Date().getTime() + 1,
      text: "Hello! How can I assist you today?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "AI Chatbot",
      },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, initialMessage)
    );
  }, []);

  const handleSend = async (newMessages = []) => {
    try {
      // Get the user's message
      const userMessage = newMessages[0];

      // Add the user's message to the messages state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );

      const response = await axios.post(
        "http://10.0.2.2:5236/api/OpenAI",
        {
          input: userMessage.text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const content = response.data.content;
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: content,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "AI Chatbot",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#8576FF"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#8576FF",
          },
          left: {
            backgroundColor: "#DDDDDD",
          },
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#8576FF",
          padding: 10,
          alignItems: "center",
          height: 100,
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#fff",
            marginTop: 40,
          }}
        >
          AI Chatbot
        </Text>
      </View>
      <GiftedChat
        textInputProps={{autoFocus: true}}
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
        alwaysShowSend
        renderBubble={renderBubble}
        renderSend={renderSend}
        scrollToBottom
      />
    </View>
  );
};

export default Chatbot;
