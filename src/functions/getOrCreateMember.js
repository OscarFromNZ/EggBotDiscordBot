/**
    * @INFO Gets of creates a member in guild with MongoDB using the guild's id and the user's id
*/

module.exports = async (client, guildId, memberId) => {
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
            lastCollectedDate: undefined
        }
        await client.db.collection("members").insertOne(memberDocbase, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("✅ Doc made");

            // Set the member doc again
            memberDoc = await client.db.collection("members").findOne({
                $and: [
                    { guild: guildId },
                    { member: memberId }
                ]
            });
        });
    };

    return await memberDoc;
};