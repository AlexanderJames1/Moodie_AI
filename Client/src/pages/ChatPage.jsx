import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ChatPage() {
  const [user, setUser] = useState(null); 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); 
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const getRoleName  = (role) => role === "assistant" ? "Moodie" : role;
  const [listening, setListening] = useState(false);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const [recognitionBusy, setRecognitionBusy] = useState(false);
  const recognition = useRef(null);

    useEffect(() => {
    if (!SpeechRecognition) return;

    recognition.current = new SpeechRecognition();
    recognition.current.lang = "en-US";
    recognition.current.interimResults = true;
    recognition.current.continuous = false;

    recognition.current.onstart = () => {
      setListening(true);
      setRecognitionBusy(false); // ready to toggle
    };

    recognition.current.onend = () => {
      setListening(false);
      setRecognitionBusy(false); // ready to toggle
    };

    recognition.current.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
      document.getElementById("chat-input")?.focus();
    };
  }, []);

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition!");
    }

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    setUser(saved ? JSON.parse(saved) : null);
  }, []);

  // Load message sa local storage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, []);

  // Para sa saved ng message in local
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendMessage = async () => {
     // Stop speech recognition if it’s currently listening
    if (listening && recognition.current) {
      recognition.current.stop();
    }

    if (!input.trim()) return;

    setIsLoading(true);

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    const updatedMessagesWithAssistant = [...updatedMessages, { role: "assistant", content: "" }];

    setMessages(updatedMessagesWithAssistant);
    setInput("");

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "Moodie:b",
          messages: updatedMessages, // send full conversation
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.message && json.message.content) {
                assistantContent += json.message.content;

                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = assistantContent;
                  return newMessages;
                });
              }
            } catch (e) {
              console.error(e);
            }
          }
        }
      }
    } catch (err) {
      console.error("Error fetching from backend:", err);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = "Error: could not get response.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground px-4">
    <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user} setUser={setUser} />

    <main className={`pt-20 w-full max-w-xl mx-auto transition-all duration-300 ${menuOpen ? "blur-sm pointer-events-none" : ""}`}>
      {/* Greeting */}
      {user && (
        <h2 className="text-xl font-semibold mb-4 text-center">
          Welcome, {user.name}!
        </h2>
      )}

      {/* Hero */}
      {messages.length === 0 && (
        <h1 className="text-2xl font-semibold text-foreground text-center mt-30 mb-0">
          How are you feeling right now?
        </h1>
      )}

      {/* Chat Messages */}
      <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-3 text-left chat-scroll">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-[70%] break-words ${m.role === "user" ? "bg-primary/20 text-foreground" : "bg-muted text-foreground"}`}>
              <span className="font-bold capitalize">{getRoleName(m.role)}:</span> {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-center space-x-2 mt-2">
            <img src="/Loading.gif" alt="Loading..." className="w-8 h-8" />
            <span className="text-sm text-muted">Assistant is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex items-center border border-border rounded-full overflow-hidden bg-background shadow-md mt-4">
        <input
          id="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything"
          className="flex-1 px-4 py-3 bg-background text-foreground focus:outline-none"
          onKeyDown={e => {
            if(e.key === "Enter"){
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={() => {
            if (!recognition.current) return;

            if (listening) {
              recognition.current.stop();
            } else if (!input.trim()) {
              recognition.current.start();
            } else {
              sendMessage();
            }
          }}
          className="px-6 py-3 cursor-pointer"
        >
        {input.trim() === "" ? (
          listening ? (
            <img src="Listen.gif" alt="Listening..." className="w-7" />
          ) : (
            <img src="microphone.png" alt="Mic" className="w-7" title="Use Microphone" />
          )
        ) : (
          <img src="Send.png" alt="Send" className="w-7" title="Send Message" />
        )}
      </button>

      </div>

      <Footer/>
    </main>
  </div>
  );
}
