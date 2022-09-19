module.exports = async (client, guildId, memberId) => {
    // Get the member doc
    let memberDoc = await client.db.collection("memberInGuild").findOne(
        { guild: guildId },
        { member: memberId }
    );

    // If there is no member doc, make a member doc
    if (!memberDoc) {
        let memberDocbase = {
            guild: guildId,
            member: memberId,
            messages: 0
        }
        await client.db.collection("memberInGuild").insertOne(memberDocbase, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("✅ Doc made");

            // Set the member doc again
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
