/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("compliments", {
	// Module config defaults.
	defaults: {
		compliments: {
			anytime: [
				"Hey there!",
				"I hope your day is as nice as your face!",
				"Have you been working out?",
				"I'm lucky to be your mirror!",
				"If I could high five you... I would!",
				"I could just hang here all day!",
				"I need some time to reflect...",
				"I see a lot of myself in you",
				"If you focus on what you’ve left behind, you will never be able to see what lies ahead",
				"I carried a watermelon",
				"You gotta hold the frame",
				"Don't forget to fill the ice-cube tray",
				"You look great today",
				"I like your style",
				"I appreciate you",
				"Your perspective is refreshing",
				"You light up the room",
				"You deserve a hug right now",
				"You should be proud of yourself",
				"You have a great sense of humor",
				"You're all that and a super-size bag of chips",
				"You're like sunshine on a rainy day",
				"Your ability to recall random factoids at just the right time is impressive",
				"How is it that you always look great, even in sweatpants?",
				"Everything would be better if more people were like you!",
				"That color is perfect on you",
				"You're wonderful",
				"Your hair looks stunning",
				"You're one of a kind!",
				"You should be thanked more often. So thank you!!",
				"You have the best ideas",
				"You always know how to find that silver lining",
				"Everyone gets knocked down sometimes, but you always get back up and keep going",
				"Being around you is like being on a happy little vacation",
				"You always know just what to say",
				"You could survive a Zombie apocalypse",
				"When you make a mistake, you fix it",
				"You're great at figuring stuff out",
				"You're like a breath of fresh air",
				"Your creative potential seems limitless",
				"Actions speak louder than words, and yours tell an incredible story",
				"When you make up your mind about something, nothing stands in your way",
				"Babies and small animals probably love you",
				"You have a good head on your shoulders",
				"You look great in that outfit",
				"Did you lose some weight? You look healthy",
				"Your hair looks amazing",
				"You rock that shirt!",
				"Your sweater looks nice. Where did you buy that?",
				"Have been working out lately?",
				"I like your pants",
				"You look even better without makeup",
				"Take a break! You deserve a vacation",
				"You are one of a kind",
				"Keep up the good work!",
				"You nailed it!",
				"Today's outfit = Thumbs up",
				"Your hair looks great today. It also looked really good two days ago",
				"Your dental hygiene is impeccable.  ",
				"You have very smooth hair",
				"You deserve a promotion",
				"I like your style",
				"That looks nice on you",
				"I like your socks",
				"You make my data circuits skip a beat",
				"You are the gravy to my mashed potatoes",
				"I like your pants",
				"You're so rad",
				"Your glass is the fullest",
				"You look so perfect",
				"You definitely know the difference between your and you're",
				"You're awesome",
				"You're the best",
				"You're really flipping smart"
			],
			morning: ["Good morning, sunshine!", "Who needs coffee when you have your smile?", "Lets get that bread!", "You are early today"],
			afternoon: ["Hitting your stride!", "You are making a difference!", "You're more fun than bubble wrap!"],
			evening: ["You are making a difference", "The day was better for your efforts", "See you tomorrow!", "Sleep tight"],
			snow: ["Snowball battle!"],
			day_sunny: ["Today is a sunny day", "It's a beautiful day", "The sun is shining today!", "It's such a beautiful day", "It's gorgeous outside, go play!"],
			day_cloudy: ["It's cloudy out there, but no meatballs", "It may be cloudy, but it's still nice out!", "The sun is hiding right now"],
			cloudy: ["Little gloomy out there!"],
			cloudy_windy: [],
			showers: ["Do we need an umbrella?"],
			rain: ["Take your umbrella with you", "It's wet out there, drive safe!", "It's rainy outside, but you brighten my day"],
			thunderstorm: ["Its just thunder!"],
			fog: [],
			night_clear: ["Weather forecast for tonight: dark"],
			night_cloudy: [],
			night_showers: [],
			night_rain: [],
			night_thunderstorm: ["It's a stormy night, don't be scared"],
			night_alt_cloudy_windy: []
		},
		updateInterval: 30000,
		remoteFile: null,
		fadeSpeed: 4000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17,
		random: true,
		mockDate: null
	},
	lastIndexUsed: -1,
	// Set currentweather from module
	currentWeatherType: "currentWeather",

	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		this.lastComplimentIndex = -1;

		var self = this;
		if (this.config.remoteFile !== null) {
			this.complimentFile(function (response) {
				self.config.compliments = JSON.parse(response);
				self.updateDom();
			});
		}

		// Schedule update timer.
		setInterval(function () {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/* randomIndex(compliments)
	 * Generate a random index for a list of compliments.
	 *
	 * argument compliments Array<String> - Array with compliments.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function (compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		var generate = function () {
			return Math.floor(Math.random() * compliments.length);
		};

		var complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/* complimentArray()
	 * Retrieve an array of compliments for the time of the day.
	 *
	 * return compliments Array<String> - Array with compliments for the time of the day.
	 */
	complimentArray: function () {
		var hour = moment().hour();
		var date = this.config.mockDate ? this.config.mockDate : moment().format("YYYY-MM-DD");
		var compliments;

		if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime && this.config.compliments.hasOwnProperty("morning")) {
			compliments = this.config.compliments.morning.slice(0);
		} else if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime && this.config.compliments.hasOwnProperty("afternoon")) {
			compliments = this.config.compliments.afternoon.slice(0);
		} else if (this.config.compliments.hasOwnProperty("evening")) {
			compliments = this.config.compliments.evening.slice(0);
		}

		if (typeof compliments === "undefined") {
			compliments = new Array();
		}

		if (this.currentWeatherType in this.config.compliments) {
			compliments.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		compliments.push.apply(compliments, this.config.compliments.anytime);

		for (var entry in this.config.compliments) {
			if (new RegExp(entry).test(date)) {
				compliments.push.apply(compliments, this.config.compliments[entry]);
			}
		}

		return compliments;
	},

	/* complimentFile(callback)
	 * Retrieve a file from the local filesystem
	 */
	complimentFile: function (callback) {
		var xobj = new XMLHttpRequest(),
			isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			path = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState === 4 && xobj.status === 200) {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	randomCompliment: function () {
		// get the current time of day compliments list
		var compliments = this.complimentArray();
		// variable for index to next message to display
		let index = 0;
		// are we randomizing
		if (this.config.random) {
			// yes
			index = this.randomIndex(compliments);
		} else {
			// no, sequential
			// if doing sequential, don't fall off the end
			index = this.lastIndexUsed >= compliments.length - 1 ? 0 : ++this.lastIndexUsed;
		}

		return compliments[index] || "";
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		// get the compliment text
		var complimentText = this.randomCompliment();
		// split it into parts on newline text
		var parts = complimentText.split("\n");
		// create a span to hold it all
		var compliment = document.createElement("span");
		// process all the parts of the compliment text
		for (var part of parts) {
			// create a text element for each part
			compliment.appendChild(document.createTextNode(part));
			// add a break `
			compliment.appendChild(document.createElement("BR"));
		}
		// remove the last break
		compliment.lastElementChild.remove();
		wrapper.appendChild(compliment);

		return wrapper;
	},

	// From data currentweather set weather type
	setCurrentWeatherType: function (data) {
		var weatherIconTable = {
			"01d": "day_sunny",
			"02d": "day_cloudy",
			"03d": "cloudy",
			"04d": "cloudy_windy",
			"09d": "showers",
			"10d": "rain",
			"11d": "thunderstorm",
			"13d": "snow",
			"50d": "fog",
			"01n": "night_clear",
			"02n": "night_cloudy",
			"03n": "night_cloudy",
			"04n": "night_cloudy",
			"09n": "night_showers",
			"10n": "night_rain",
			"11n": "night_thunderstorm",
			"13n": "night_snow",
			"50n": "night_alt_cloudy_windy"
		};
		this.currentWeatherType = weatherIconTable[data.weather[0].icon];
	},

	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if (notification === "CURRENTWEATHER_DATA") {
			this.setCurrentWeatherType(payload.data);
		}
	}
});
