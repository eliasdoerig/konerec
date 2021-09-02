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
    const key = Buffer.from(`${process.env.INFOMANIAK_API_SECRET}`).toString(
      "base64"
    );

    fetch(
      `https://newsletter.infomaniak.com/api/v1/public/mailinglist/${id}/importcontact`,
      {
        method: "POST",
        body,
        headers: {
          Authorization: `Basic ${key}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        res.status(201).json({ result });
      })
      .catch((error) => {
        res.status(500).json({ error });
        return;
      });
  }
};
