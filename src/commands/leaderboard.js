/**
    * @INFO Check the eggboard for a leaderboard of eggs !
*/

module.exports = {
    data: {
        name: "leaderboard",
        description: "View the leaderboard of all eggers!",
        permission: 0, // Member
        isDangerous: false,
    },

    async execute(client, interaction) {
        var s = " "
        await client.db.collection("users").find().forEach(doc => {
            s = s + " <@" + doc.id + ">" + " " + doc.eggs + " eggs\n"
        })//.then(interaction.editReply({ content: s.toString() }));

        await interaction.respond(interaction, s.toString());
    }
}