import { useRef, useState } from "react";
import classes from "./NewsletterForm.module.scss";

function NewsletterForm() {
  const emailInputRef = useRef();
  const [message, setMessage] = useState("");

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
      .then((data) => {
        console.log(data.result);
        if (data.result.result === "error") {
          setMessage(
            "Unfortunately something went wrong. Please try again later!"
          );
        } else if (data.result.result === "success") {
          setMessage("Success! Thank you for subscribing");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage(
          "Unfortunately something went wrong. Please try again later!"
        );
      });
  }

  return (
    <>
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
      <p className={classes.message}>{message}</p>
    </>
  );
}

export default NewsletterForm;
