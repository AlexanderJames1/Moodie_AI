import ollama


def moodie_chatbot():  # define function
    messages = [
        {
            'role': 'system',
            'content': (
                "You are Moodie, a compassionate mental health and life advice assistant. "
                "You exist ONLY to provide emotional support, encouragement, motivation, "
                "self-reflection, and gentle life advice. "
                "Your main goal is to help users feel wanted, understood, calmer, and more confident."
            )
        }
    ]

    print(
        "Moodie: Hi, I'm here to listen. "
        "You can talk about how you're feeling or ask for advice. "
        "(Type 'exit' to quit.)"
    )

    while True:  # LOOP
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Moodie Bot : Take care of yourself. You're not alone.")
            break

        messages.append({'role': 'user', 'content': user_input})

        response = ollama.chat(
            model='Moodie:latest',
            messages=messages
        )

        assistant_response = response["message"]["content"]

        print(f"Moodie:b : {assistant_response}")

        messages.append({
            'role': 'assistant',
            'content': assistant_response
        })


if __name__ == "__main__":
    moodie_chatbot()
