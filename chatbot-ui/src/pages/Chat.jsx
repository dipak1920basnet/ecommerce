import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await api.get("chats/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const reconstructed = [];

        res.data.reverse().forEach((log) => {
          reconstructed.push({ type: "user", text: log.query });
          reconstructed.push({
            type: "bot",
            text: "Here are the results I found:",
            products: log.response,
          });
        });

        setMessages(reconstructed);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("access");
          navigate("/");
        } else {
          console.error("Failed to load chat history:", err);
        }
      }
    };

    fetchHistory();
  }, [navigate]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("access");
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await api.post(
        "chat/",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages([
        ...newMessages,
        {
          type: "bot",
          text: res.data.message,
          products: res.data.products,
        },
      ]);
      setInput("");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("access");
        navigate("/");
      } else {
        setMessages([
          ...newMessages,
          {
            type: "bot",
            text: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-2xl mx-auto w-full flex-1 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-4">
            {msg.type === "user" ? (
              <div className="text-right">
                <p className="inline-block bg-blue-500 text-white p-2 rounded-lg">
                  {msg.text}
                </p>
              </div>
            ) : (
              <div>
                <p className="bg-gray-200 inline-block p-2 rounded-lg mb-2">
                  {msg.text}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {msg.products &&
                    msg.products.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="max-w-2xl mx-auto mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded border"
          placeholder="Ask me something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className={`bg-blue-600 text-white px-4 rounded ${
            !input.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Send
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
// This component represents the main chat interface where users can interact with the chatbot.