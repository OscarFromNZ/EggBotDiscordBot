module.exports = async (client, guildId, memberId) => {
    // Get the guild doc
    let memberDoc = await client.db.collection("memberInGuild").findOne(
        { guild: guildId },
        { member: memberId }
    );

    // If there is no guild doc, make a guild doc
    if (!memberDoc) {
        await client.db.collection("memberInGuild").insertOne({ guild: guildId, member: memberId }, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("✅ Doc made");

            // Set the guild doc again
            memberDoc = await client.db.collection("memberInGuild").findOne({
                $and: [
                    { guild: guildId },
                    { member: memberId }
                ]
            });
        });
    };

    return await memberDoc;
};
