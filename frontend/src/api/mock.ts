import api from "./axios";

export const setupMocks = () => {
    const useMock = import.meta.env.VITE_USE_MOCK === "true";
    
    if (!useMock) return;

    console.log("🚀 API Mocking Enabled");

    // Intercept requests and return mock responses
    api.interceptors.request.use(async (config) => {
        const url = config.url || "";
        
        // Auth Mocks
        if (url === "/auth/login") {
            await new Promise(resolve => setTimeout(resolve, 600));
            config.adapter = async () => ({
                data: "mock-jwt-token",
                status: 200, statusText: "OK", headers: {}, config
            });
        }

        if (url === "/auth/signup") {
            await new Promise(resolve => setTimeout(resolve, 600));
            config.adapter = async () => ({
                data: { message: "User created successfully" },
                status: 201, statusText: "Created", headers: {}, config
            });
        }

        // Flashcard Mocks
        if (url === "/api/flashcards/decks") {
            config.adapter = async () => ({
                data: ["Spanish Vocab", "React Hooks", "History"],
                status: 200, statusText: "OK", headers: {}, config
            });
        }

        if (url.startsWith("/api/flashcards/deck/") && url.endsWith("/size")) {
            const deckId = url.split("/")[4];
            config.adapter = async () => ({
                data: { deckId, size: deckId === "Spanish Vocab" ? 42 : 15 },
                status: 200, statusText: "OK", headers: {}, config
            });
        }

        if (url.startsWith("/api/flashcards/deck/") && !url.endsWith("/size")) {
            const deckId = url.split("/")[4];
            config.adapter = async () => ({
                data: [
                    { id: "1", frontText: "Hola", backText: "Hello", deckId },
                    { id: "2", frontText: "Gracias", backText: "Thank you", deckId },
                ],
                status: 200, statusText: "OK", headers: {}, config
            });
        }

        // Session Mocks
        if (url.startsWith("/api/sessions")) {
            const params = new URLSearchParams(config.params);
            const deckId = params.get("deckId") || "default";
            
            if (config.method === "get") {
                config.adapter = async () => ({
                    data: {
                        userId: "user_123",
                        flashcardsToReview: [
                            { id: "1", deckId, frontText: "Hola", backText: "Hello", nextReviewDate: 100, easeFactor: 2.5, interval: 1, repetitions: 1 },
                            { id: "2", deckId, frontText: "Adiós", backText: "Goodbye", nextReviewDate: 105, easeFactor: 2.5, interval: 1, repetitions: 1 }
                        ],
                        cardsReviewedToday: 5
                    },
                    status: 200, statusText: "OK", headers: {}, config
                });
            }
        }

        if (url.match(/\/api\/sessions\/.*\/review/)) {
            config.adapter = async () => ({
                data: {},
                status: 200, statusText: "OK", headers: {}, config
            });
        }

        return config;
    });
};
