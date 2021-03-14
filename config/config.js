/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "imperial",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "middle_center",
			config: {
				timeFormat: 12,
				showDate: true,
				showBold: true,
			}
		},
		{
			module: "calendar",
			header: "Upcoming Events",
			position: "middle_center",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/et10qmhutg17ccq2pdh09hkdpc%40group.calendar.google.com/public/basic.ics",
					}
				]
			}
		},
		{
			module: "compliments",
			position: "middle_center"
		},
		{
			module: "MMM-NowPlayingOnSpotify",
			position: "middle_center",
			config: {
				clientID: "d0538e0bd05c4d6fb923fabdf9b2effe",
				clientSecret: "202e1b7027f943a9b0948c2ed7bc48e3",
				accessToken: "BQCKvXpg44gfDyuUvkUgRW1BWpZbJ6u6_mLYBahcdYzDlqDqiF_FVEltDORYSFzu_r3CbyS_R0t6mPEzG9n0gje7_uSMuq3MFi94tV_LbuBPhh6qDQP3BpEN0-QKLg311dFNSdYkUUFEeX7nLm4lvQAToA",
				refreshToken: "AQDI7tuHBjxXqs_S9YXR9CX2eSaKOck-QikruTSUDkpa2Cy1XDKoziw0ZAKcUnvbB_6tWL_0wEDEds9r3AIrrU-dFDfYMyFQF19JIlNADQTYW4yTrPulcAQ9FuzWiUwltRw",
				showCoverArt: false 
			}
		},
		{
			module: "MMM-OpenmapWeather",
			position: "middle_center",
			header: "Current Weather",
			config: {
				location: "West Los Angeles",
				locationID: "5393212", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "daaf866203b71ac99a59f88613a3da4a",
				colorIcon: true, 
				units: 'imperial',
				showFeelsLike: true,
				showSun: true
			}
		},
		{
			module: "weatherforecast",
			position: "middle_center",	// This can be any of the regions.
										// Best results in left or right regions.
			config: {
				// See 'Configuration options' for more information.
				location: "West Los Angeles",
				locationID: "5393212", //Location ID from http://bulk.openweathermap.org/sample/city.list.json.gz
				appid: "daaf866203b71ac99a59f88613a3da4a", //openweathermap.org API key.
				units: "imperial"
			}
		},
		{
			module: "newsfeed",
			position: "middle_center",
			config: {
				feeds: [
					{
						title: "New Yorker",
						url: "https://www.newyorker.com/feed/news"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true,
				showDescription: true
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
