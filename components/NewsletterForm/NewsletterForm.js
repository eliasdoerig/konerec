import { useRef } from "react";

function NewsletterForm() {
  const emailInputRef = useRef("");

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    fetch("./api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <form onSubmit={registrationHandler}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        aria-label="Your email"
        required
        ref={emailInputRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewsletterForm;
