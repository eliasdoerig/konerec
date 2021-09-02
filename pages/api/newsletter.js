const id = 93941;

export default (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const body = JSON.stringify({
      contacts: [
        {
          email: userEmail,
        },
      ],
    });

    console.log(body);
    fetch(
      `https://newsletter.infomaniak.com/api/v1/public/mailinglist/${id}/importcontact`,
      {
        method: "POST",
        body,
        headers: {
          Authorization: `Basic dHQwYWc/Icc9EK/fJsDG7QjJFHD6m8BZofDjaI+VGNklHe6AEv5cU/S5p/4/S4Egr0+8KUmL+IVuzHPn:$2y$10$fcjmy4XCNZ4vjXsnO6/ptuWIhsGnYLD0x.4hc.TGkve7wdDkM6mJe`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        res.status(201).json({ data: data });
      });
  }
};
