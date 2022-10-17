/**
    * @INFO Gets of creates a member in guild with MongoDB using the guild's id and the user's id
*/

module.exports = async (client, guildId, memberId, callback) => {
    console.log(guildId, memberId, callback);
    // Get the member doc
    let memberDoc = await client.db.collection("members").findOne(
        { guild: guildId },
        { member: memberId }
    );

    // If there is no member doc, make a member doc
    if (!memberDoc) {
        let memberDocbase = {
            guild: guildId,
            member: memberId,
            lastCollectedDate: null
        }
        await client.db.collection("members").insertOne(memberDocbase, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("✅ Doc made");

            // Set the member doc again
            memberDoc = await client.db.collection("members").findOne(
                {
                    $and: [
                        { guild: guildId },
                        { member: memberId }
                    ]
                }
            );
            // Callback
            
            if (callback) await callback({
                guild: guildId,
                member: memberId,
                lastCollectedDate: null
            });

            // Return
            return await new Promise(async (resolve, reject) => {
                resolve({
                    guild: guildId,
                    member: memberId,
                    lastCollectedDate: null
                });
            });
        });
    } else {
        // Callback
        if (callback) await callback(memberDoc);

        // Return
        return await new Promise(async (resolve, reject) => {
            resolve(memberDoc);
            console.log('b' + memberDoc);
        });
    }
};