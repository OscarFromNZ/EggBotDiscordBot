/**
    * @INFO Check the eggboard for a leaderboard of eggs !
*/

module.exports = {
    async execute(client, interaction) {
        var s = " ";
        let arr = [];
        
        await client.db.collection("users").find().forEach(doc => {
            arr.push(doc);
        });
        arr.sort((a, b) => b.eggs - a.eggs);

        arr.forEach(user => {
            s = s + " <@" + user.id + ">" + " " + user.eggs + " eggs\n";
        });

        await interaction.respond(interaction, s.toString());
    }
}