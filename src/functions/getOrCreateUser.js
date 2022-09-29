/**
    * @INFO Gets of creates a user in MongoDB with id
*/

module.exports = async (client, userId, callback) => {
    // Get the user doc
    let userDoc = await client.db.collection("users").findOne(
        { id: userId },
    );

    // If there is no user doc, make a user doc
    if (!userDoc) {
        let userDocBase = {
            id: userId,
            eggs: 0,
        }
        await client.db.collection("users").insertOne(userDocBase, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("✅ Doc made");

            // Set the user doc again
            userDoc = await client.db.collection("users").findOne(
                { id: userId },
            );
            console.log('a' + userDoc);

            // Callback
            if (callback) await callback(userDoc);

            // Return
            return await new Promise(async (resolve, reject) => {
                resolve(userDoc);
                console.log('b' + userDoc);
            });
        });

    } else {
        // Callback
        if (callback) await callback(userDoc);

        // Return
        return await new Promise(async (resolve, reject) => {
            resolve(userDoc);
            console.log('b' + userDoc);
        });
    }
};
