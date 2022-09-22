/**
    * @INFO Gets of creates a user in MongoDB with id
*/

module.exports = async (client, userId) => {
    // Get the user doc
    let userDoc = await client.db.collection("users").findOne(
        { id: userId },
    );

    // If there is no member doc, make a member doc
    if (!memberDoc) {
        let memberDocbase = {
            id: userId,
            eggs: 0,
        }
        await client.db.collection("users").insertOne(memberDocbase, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("✅ Doc made");

            // Set the member doc again
            userDoc = await client.db.collection("users").findOne(
                { id: userId },
            );
        });
    };

    return await userDoc;
};
