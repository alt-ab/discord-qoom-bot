require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require("ms")

var GphApiClient = require('giphy-js-sdk-core');
const GIPHY_TOKEN = process.env.GIPHY_TOKEN;
giphy = GphApiClient(GIPHY_TOKEN);

const PORT = process.env.PORT || 3000;
const prefix = process.env.prefix;

client.on(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

client.once('ready', () => {
    console.log(`Blast off!`);
});
//* Logged in as ${client.user.tag}

client.once('reconnecting', () => {
    console.log(`Reconnecting!`);
});

client.once('disconnect', () => {
    console.log(`Disconnected!`);
});


client.on('message', message => {

    const args1 = message.content.split(/ +/);

    if (args1.includes("qoom")) {

        message.react('😄');

        const heart = "heart";
        giphy.search('gifs', { "q": heart })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                })
            }).catch((err) => {
                message.channel.send('Error sorry');
                console.log(err);
            })
    }

    if (args1.includes("uh") || args1.includes("um") || message.content.includes(" um") || message.content.includes(" uh")) {

        message.react('👎');

        const bad = "kermit bad";
        giphy.search('gifs', { "q": bad })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                })
            }).catch((err) => {
                message.channel.send('Error sorry');
                console.log(err);
            })
    }

    if (args1.includes("hi") || args1.includes("hello") || args1.includes("hii")) {

        message.react('👎');

        const hello = "hello";
        giphy.search('gifs', { "q": hello })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                })
            }).catch((err) => {
                message.channel.send('Error sorry');
                console.log(err);
            })
    }

    if (message.content.startsWith("Qoombot") || message.content.startsWith("qoombot")) {
        let explain = new Discord.MessageEmbed();

        explain.setTitle(":robot:  Qoombot");
        explain.setColor('00ffcc');
        explain.setAuthor(client.user.username, client.user.displayAvatarURL());
        explain.setDescription("**Hello, I am the Qoom bot! Qoom is a visual, collaborative, and online development environment that supports many languages. We hope you enjoy!**");
        explain.addField("Qoom", ":star: To learn more about Qoom, try ``qmqoom``!");
        explain.addField("Prefix", "My prefix is ``qm``.");
        explain.addField("Other Commands", "For our fun other commands, try ``qmcommands``.");
        explain.setThumbnail(client.user.displayAvatarURL());
        explain.setAuthor(client.user.username, client.user.displayAvatarURL());

        message.channel.send(explain);
    }


    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "qoom") {

        let qoom = new Discord.MessageEmbed();

        var link1 = "https://www.qoom.io/";

        qoom.setTitle(":robot:  Qoom");
        qoom.setColor('00ffcc');
        qoom.setAuthor(client.user.username, client.user.displayAvatarURL());
        qoom.setDescription("**Here are some commands to get to know us more!**");
        qoom.addField("Official Qoom Website: ", link1);
        qoom.addField("START CODING ``qmcode``", "Go to your online QOOM IDE and get started coding!");
        qoom.addField("GET INSPIRED by QOOM ``qminspired``", "Look for inspiration see what you can do with QOOM.");
        qoom.addField("GET HELP with QOOM ``qmhelp``", "Check out guides on to get started on various projects OR submit questions for help!");
        qoom.addField("KEEP UP with QOOM ``qmsocials``", "Follow our socials for more updates and amazing resources!");
        qoom.addField("FAQ ``qmfaq``", "For additional questions and suggestions.");
        qoom.setThumbnail(client.user.displayAvatarURL());
        qoom.setAuthor(client.user.username, client.user.displayAvatarURL());

        message.channel.send(qoom);

    }

    if (command === "inspired") {
        let inspired = new Discord.MessageEmbed();

        var link2 = "https://app.qoom.io/qoom-of-the-week/home.md?cid=yt001";
        var link4 = "https://www.qoom.io/blog";
        var link7 = "https://www.qoom.io/projects";
        var link3 = "https://www.qoom.io/creator-group";


        inspired.setTitle(":robot: Get inspired with Qoom!");
        inspired.setColor('00ffcc');
        inspired.setAuthor(client.user.username, client.user.displayAvatarURL());
        inspired.setDescription("**Get inspired with what Qoom members are creating!**");
        inspired.addField("Qoom of the Week", "A fun collective of tutorials made by the Qoom staff! " + link2);
        inspired.addField("Blog", "Check out what people are doing with Qoom, with our blog! " + link4);
        inspired.addField("Featured Projects", "Check out some inspiring projects made from Qoom! " + link7);
        inspired.addField("Creator Group", "Check out our apprenticeship program for high school and college students! " + link3);
        inspired.setThumbnail(client.user.displayAvatarURL());
        inspired.setAuthor(client.user.username, client.user.displayAvatarURL());

        message.channel.send(inspired);
    }

    if (command === "help") {
        let help = new Discord.MessageEmbed();

        var link8 = "https://www.qoom.io/help";
        var link12 = "https://www.qoom.io/contactus";


        help.setTitle(":robot: Get help for Qoom!");
        help.setColor('00ffcc');
        help.setAuthor(client.user.username, client.user.displayAvatarURL());
        help.setDescription("**Check out guides on how to get started and various projects or submit questions for help!**");
        help.addField("Help", "Still need more help? Check out some guides to get started and learn! " + link8);
        help.addField("Contact Us", "Fill in a form to contact Qoom! " + link12);
        help.setThumbnail(client.user.displayAvatarURL());
        help.setAuthor(client.user.username, client.user.displayAvatarURL());

        message.channel.send(help);
    }

    if (command === "socials") {
        let social = new Discord.MessageEmbed();

        var link9 = "https://www.instagram.com/qoomspace/";
        var link12 = "https://www.youtube.com/channel/UCEVFNrRE2qk5pTGVUtHtFhw";
        var link10 = "https://www.facebook.com/qoom.io/"

        social.setTitle(":robot: KEEP UP with QOOM!");
        social.setColor('00ffcc');
        social.setAuthor(client.user.username, client.user.displayAvatarURL());
        social.setDescription("**Follow our socials for more updates and amazing resources!**");
        social.addField("Instagram", "Follow us on Instagram! " + link9);
        social.addField("Youtube", "Check out our Youtube videos for easy-to-follow tutorials! " + link12);
        social.addField("Facebook", "And follow us on Facebook! " + link10);
        social.setThumbnail(client.user.displayAvatarURL());
        social.setAuthor(client.user.username, client.user.displayAvatarURL());

        message.channel.send(social);
    }

    if (command === "code") {
        let code = new Discord.MessageEmbed();

        var link5 = "https://www.qoom.io/subscribe/gotocodingspace";
        var link6 = "https://www.qoom.io/pricing";

        code.setTitle(":robot: Start Coding with Qoom!");
        code.setColor('00ffcc');
        code.setAuthor(client.user.username, client.user.displayAvatarURL());
        code.setDescription("**Go to your online Qoom IDE and get started coding!**");
        code.addField("Create an Account!", "Start coding with Qoom! " + link5);
        code.addField("Pricing", "There's a plan for everyone! Free, Starter, and Pro! " + link6);
        code.setThumbnail(client.user.displayAvatarURL());
        code.setAuthor(client.user.username, client.user.displayAvatarURL());

        message.channel.send(code);
    }

    if (command === "faq") {
        let faq = new Discord.MessageEmbed();

        faq.setTitle(":robot: Frequently Asked Questions");
        faq.setColor('00ffcc');
        faq.setAuthor(client.user.username, client.user.displayAvatarURL());
        faq.setDescription("**For any other frequently asked questions and suggestions for Qoom!**");
        faq.addField("What is an IDE?", "An IDE stands for integrated development environment, which is basically a loaded text editor to help you code like Qoom.io!");
        //! TO DO
        faq.addField("More Questions or Suggestions? ``qmdm``", "Other than filling out the Contact Form, you can DM us with ``qmdm`` with any of your questions!");
        faq.setThumbnail(client.user.displayAvatarURL());
        faq.setAuthor(client.user.username, client.user.displayAvatarURL());
        //this is a comment
        message.channel.send(faq);
    }

    if (command === "commands") {

        let cmd = new Discord.MessageEmbed();
        cmd.setTitle(":robot: Qoom");
        cmd.setColor('00ffcc');
        cmd.setAuthor(client.user.username, client.user.displayAvatarURL());
        cmd.setDescription("**Here are my other commands and features we are working on!**");
        //!TO DO
        cmd.addField("Direct Messaging", "We are currently working on a *direct messaging command* if you have any other questions for us that you do not want to send through email!");
        //? OTHER TO DO - TIMER
        cmd.addField("Timer", `Need help keeping on track? We are working on a *timer feature* to help you stay on time! Usage: ${prefix}timer [time s/m/h] [reason]`);
        //* INSTAGRAM
        cmd.addField("Updates", "Another feature we are working on is automatically bringing Qoom's Instagram posts right here to Discord!");
        cmd.addField("🌟Gifs and Stickers", "Try ``qmgif <word>`` to have Qoombot send a gif! And try ``qmstick <word>`` to send a sticker!");
        cmd.addField("Delete", "To those who have the permissions, you can try ``qmdelete <number>`` to delete that number of messages from the channel! Helps to clean up the clutter");
        cmd.addField("Public Speaking", "You may have noticed that anytime you say \"uh\" or \"um\", you get sent a kermit meme! ")
        cmd.setThumbnail(client.user.displayAvatarURL());
        cmd.setAuthor(client.user.username, client.user.displayAvatarURL());

        message.channel.send(cmd);

    }

    if (command === "timer") {

        let time = args[0]
        if (!time) return message.reply("You need to specify the time with a number and the duration. For example, `5s` for 5 seconds!")
        if (ms(time) > ms("1d")) return message.reply("You can't set an alarm longer than 1 day.")

        let reason = args.slice(1).join(' ')
        if (!reason) return message.reply("Reason for alarm")

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} Alarm`, message.author.displayAvatarURL())
            .setColor("00ffcc")
            .setDescription(`Time: \`${time}\`\nReason: \`${reason}\``)
            .setTimestamp()
        message.channel.send(embed)

        setTimeout(() => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag} Your alarm has ended.`, message.author.displayAvatarURL())
                .setColor("00ffcc")
                .setDescription(`Time: \`${time}\`\nReason: \`${reason}\`\nAlarm set in server: \`${message.guild.name}\``)
                .setTimestamp()
            message.channel.send(embed),
            message.author.send(embed)
        }, ms(time))
    }

    //! TO DO 
    if (command === "dm") {
        message.author.send(`Send us your suggestions or questions here! And we will get back to you as we can!`);
        console.log(message.response);
    }

    //* INSTAGRAM    

    if (command === "gif") {
        const content = message.content.slice(prefix.length).split(' ');
        giphy.search('gifs', { "q": content })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];
                message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                })
            }).catch((err) => {
                message.channel.send('Error sorry');
                console.log(err);
            })
    }

    if (command === 'delete') {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.send("You do not have permissions!");

            return
        }
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true)
            .catch(err => {
                console.error(err);
            })
        message.channel.send("Done! Deleted " + amount);
    }
});

client.login(process.env.DISCORD_TOKEN);
