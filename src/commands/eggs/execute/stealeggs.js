/**
    * @INFO This command lets a user steal eggs from a user
*/

module.exports = {
    async execute(client, interaction) {
        return interaction.editReply({ content: "Content under development", ephemeral: true });

        let victimid = await interaction.options._hoistedOptions[0].user.id;
        let stealerid = await interaction.user.id;
        let risklvl = await interaction.options._hoistedOptions[1].value;
        let percentsuccess = Math.floor(Math.random() * 33 * risklvl) + 1; // Amount gained/lost
        var random = Math.floor(Math.random() * 101);
        
        if (random <= percentsuccess) {
            await interaction.editReply(`You won, would've gained ${percentsuccess / 2} eggs | *this command is still under development and doesn't actually do anything yet*`);
        } else {
            await interaction.editReply(`You lost, would've lost ${percentsuccess / 2} eggs | *this command is still under development and doesn't actually do anything yet*`);
        }
    }
}