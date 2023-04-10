const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.product_description).insert([
      {
        product_id: 4,
        language_id: 'nl',
        name: 'Tanita RD-953 Black',
        short_description: 'Tanita RD-953: Lichaamssamenstelling weegschaal',
        long_description:
          'De Tanita RD-953 Zwart is een lichaamssamenstelling weegschaal die gedetailleerde metingen biedt van gewicht, lichaamsvet, spiermassa, botdichtheid, watergehalte en meer. Het maakt gebruik van Bio-elektrische Impedantie Analyse (BIA) technologie voor nauwkeurige metingen en kan worden verbonden met een smartphone app om de voortgang in de loop van de tijd bij te houden. De weegschaal heeft een strak zwart design met een groot LCD-scherm en kan gegevens opslaan voor maximaal vier gebruikers. Het is een geweldig hulpmiddel voor iedereen die zijn algehele gezondheid en fitness wil monitoren en verbeteren.',
      },
      {
        product_id: 4,
        language_id: 'en',
        name: 'Tanita RD-953 Black',
        short_description: 'Tanita RD-953: Body Composition Scale',
        long_description:
          'The Tanita RD-953 Black is a body composition scale that provides detailed measurements of weight, body fat, muscle mass, bone density, water content, and more. It uses Bioelectrical Impedance Analysis (BIA) technology to provide accurate readings, and can connect to a smartphone app to track progress over time. The scale features a sleek black design with a large LCD display, and can store data for up to four users. It is a great tool for anyone looking to monitor and improve their overall health and fitness.',
      },
      {
        product_id: 5,
        language_id: 'nl',
        name: 'Germin vivoactive',
        short_description: 'Germin Vivoactive: Smartwatch voor actieve levensstijl',
        long_description:
          'De Germin Vivoactive is een smartwatch die is ontworpen voor een actieve levensstijl. Het biedt functies zoals ingebouwde GPS, hartslagmeting, stappenteller, slaapmonitoring en meer. De Vivoactive kan ook worden gebruikt om meldingen van een smartphone te ontvangen, muziek te bedienen en te betalen met Garmin Pay. De batterij gaat tot 7 dagen mee en het horloge is waterbestendig tot 50 meter diepte. Het heeft een slank en stijlvol ontwerp en is beschikbaar in verschillende kleuren en bandjes. Het is een geweldige keuze voor iedereen die een gezonde en actieve levensstijl nastreeft.',
      },
      {
        product_id: 5,
        language_id: 'en',
        name: 'Germin Vivoactive',
        short_description: 'Germin Vivoactive: Smartwatch for active lifestyle',
        long_description:
          'The Germin Vivoactive is a smartwatch designed for an active lifestyle. It offers features such as built-in GPS, heart rate monitoring, step tracking, sleep monitoring, and more. The Vivoactive can also be used to receive notifications from a smartphone, control music, and make payments with Garmin Pay. The battery lasts up to 7 days and the watch is water-resistant up to 50 meters. It has a sleek and stylish design and is available in various colors and bands. It is a great choice for anyone pursuing a healthy and active lifestyle.',
      },
      {
        product_id: 6,
        language_id: 'nl',
        name: 'Withings Body',
        short_description: 'Withings Body: Slimme weegschaal voor lichaamssamenstelling',
        long_description:
          'De Withings Body is een slimme weegschaal die de lichaamssamenstelling meet, waaronder gewicht, lichaamsvet, spiermassa, waterretentie en botdichtheid. Het maakt gebruik van Wi-Fi of Bluetooth om gegevens te synchroniseren met de Withings Health Mate app voor eenvoudige tracking en monitoring van de voortgang. De weegschaal heeft een strak en modern design met een groot, gemakkelijk leesbaar scherm. Het kan tot acht gebruikers herkennen en synchroniseert automatisch hun gegevens met hun individuele profielen. De Withings Body is een geweldig hulpmiddel voor iedereen die een gezonde lichaamssamenstelling wil bereiken en behouden.',
      },
      {
        product_id: 6,
        language_id: 'en',
        name: 'Withings Body',
        short_description: 'Withings Body: Smart Body Composition Scale',
        long_description:
          'The Withings Body is a smart body composition scale that measures weight, body fat, muscle mass, water retention, and bone density. It uses Wi-Fi or Bluetooth to sync data with the Withings Health Mate app for easy tracking and monitoring of progress. The scale has a sleek and modern design with a large, easy-to-read screen. It can recognize up to eight users and automatically syncs their data to their individual profiles. The Withings Body is a great tool for anyone looking to achieve and maintain a healthy body composition.',
      },

      {
        product_id: 7,
        language_id: 'nl',
        name: 'Samsung Galaxy S22 128GB 5G',
        short_description: 'Samsung Galaxy S22: 5G-smartphone met 128GB opslag',
        long_description:
          'De Samsung Galaxy S22 128GB 5G is een krachtige en veelzijdige smartphone. Het heeft een groot en levendig display, snelle en responsieve prestaties en wordt geleverd met 128GB opslagruimte voor al uw apps, fotos en videos. Het heeft ook 5G-connectiviteit voor razendsnelle download- en uploadsnelheden. Het camerasysteem is van topklasse met meerdere lenzen en geavanceerde functies voor verbluffende fotos en videos. De telefoon heeft een strak en modern ontwerp met een duurzame bouwkwaliteit. Het bevat ook functies zoals draadloos opladen, water- en stofbestendigheid en een langdurige batterij. De Samsung Galaxy S22 128GB 5G is een geweldige keuze voor iedereen die op zoek is naar een premium smartphone met de nieuwste technologie.',
      },
      {
        product_id: 7,
        language_id: 'en',
        name: 'Samsung Galaxy S22 128GB 5G',
        short_description: 'Samsung Galaxy S22: 5G smartphone with 128GB storage',
        long_description:
          'The Samsung Galaxy S22 128GB 5G is a powerful and feature-packed smartphone. It has a large and vibrant display, fast and responsive performance, and comes with 128GB of storage for all your apps, photos, and videos. It also has 5G connectivity for lightning-fast download and upload speeds. The camera system is top-notch with multiple lenses and advanced features for stunning photos and videos. The phone has a sleek and modern design with a durable build quality. It also includes features like wireless charging, water and dust resistance, and a long-lasting battery. The Samsung Galaxy S22 128GB 5G is a great choice for anyone looking for a premium smartphone with cutting-edge technology.',
      },
      {
        product_id: 8,
        language_id: 'nl',
        name: 'Samsung Galaxy S21 FE 128GB 5G',
        short_description: 'Samsung Galaxy S21 FE: 5G-smartphone met 128GB opslag',
        long_description:
          "De Samsung Galaxy S21 FE 128GB 5G is een geavanceerde smartphone met 5G-connectiviteit en indrukwekkende functies. Met 128GB opslagruimte heb je voldoende ruimte voor al je apps, foto's en video's. Het 6,5-inch scherm heeft een hoge resolutie en biedt een prachtige kijkervaring. De camera's van de Galaxy S21 FE zijn van hoge kwaliteit en hebben tal van functies, waaronder 4K-video-opname. De telefoon is snel en responsief dankzij de krachtige processor en 5G-connectiviteit. Het ontwerp van de S21 FE is strak en modern, met een duurzame bouwkwaliteit. De batterij heeft een lange levensduur en kan snel worden opgeladen met de meegeleverde oplader. Met de Samsung Galaxy S21 FE 128GB 5G heb je een uitstekende smartphone met indrukwekkende functies en de nieuwste connectiviteit.",
      },
      {
        product_id: 8,
        language_id: 'en',
        name: 'Samsung Galaxy S21 FE 128GB 5G',
        short_description: 'Samsung Galaxy S21 FE: 5G smartphone with 128GB storage',
        long_description:
          'The Samsung Galaxy S21 FE 128GB 5G is a sleek and powerful smartphone with advanced features. It boasts a large and vibrant display, fast and responsive performance, and comes with 128GB of storage for all your apps, photos, and videos. With 5G connectivity, you can experience lightning-fast download and upload speeds. The camera system is top-notch with multiple lenses and advanced features for stunning photos and videos. The phone has a modern design with a durable build quality. It also includes features like wireless charging, water and dust resistance, and a long-lasting battery. The Samsung Galaxy S21 FE 128GB 5G is a great choice for anyone looking for a premium smartphone with cutting-edge technology.',
      },

      {
        product_id: 9,
        language_id: 'nl',
        name: 'Samsung Galaxy Z Flip 4 256GB 5G',
        short_description: 'Samsung Galaxy Z Flip 4: 5G opvouwbare smartphone met 256GB opslag',
        long_description:
          'De Samsung Galaxy Z Flip 4 256GB 5G is een revolutionaire opvouwbare smartphone met geavanceerde functies. Het heeft een uniek clamshell-ontwerp dat in tweeën vouwt voor een compacte en draagbare vormfactor. Het heeft een groot en levendig opvouwbaar scherm, snel en responsief prestaties, en wordt geleverd met 256GB opslag voor al uw apps, fotos en videos. Met 5G-connectiviteit kunt u genieten van razendsnelle download- en uploadsnelheden. Het camerasysteem is top-notch met meerdere lenzen en geavanceerde functies voor prachtige fotos en videos. De telefoon heeft een strak en modern ontwerp met een duurzame bouwkwaliteit. Het bevat ook functies zoals draadloos opladen, water- en stofbestendigheid en een lange batterijduur. De Samsung Galaxy Z Flip 4 256GB 5G is een geweldige keuze voor iedereen die op zoek is naar een unieke en innovatieve smartphone die opvalt tussen de massa.',
      },

      {
        product_id: 9,
        language_id: 'en',
        name: 'Samsung Galaxy Z Flip 4 256GB 5G',
        short_description: 'Samsung Galaxy Z Flip 4: 5G foldable smartphone with 256GB storage',
        long_description:
          'The Samsung Galaxy Z Flip 4 256GB 5G is a revolutionary foldable smartphone with cutting-edge features. It has a unique clamshell design that folds in half for a compact and portable form factor. It boasts a large and vibrant foldable display, fast and responsive performance, and comes with 256GB of storage for all your apps, photos, and videos. With 5G connectivity, you can experience lightning-fast download and upload speeds. The camera system is top-notch with multiple lenses and advanced features for stunning photos and videos. The phone has a sleek and modern design with a durable build quality. It also includes features like wireless charging, water and dust resistance, and a long-lasting battery. The Samsung Galaxy Z Flip 4 256GB 5G is a great choice for anyone looking for a unique and innovative smartphone that stands out from the crowd.',
      },
      {
        product_id: 10,
        language_id: 'nl',
        name: 'Samsung Galaxy Z Fold 4 512GB 5G + Zwarte leren hoes',
        short_description: 'Samsung Galaxy Z Fold 4: 5G opvouwbare smartphone met 512GB opslag en zwarte leren hoes',
        long_description:
          "De Samsung Galaxy Z Fold 4 512GB 5G + Zwarte leren hoes is een premium en innovatieve opvouwbare smartphone met geavanceerde functies. Het heeft een uniek opvouwbaar ontwerp dat zich opent om een ​​groot en meeslepend display te onthullen, waardoor u kunt multitasken en inhoud kunt bekijken zoals nooit tevoren. Het wordt geleverd met 512GB opslag voor al uw apps, foto's en video's en bevat een strakke en stijlvolle zwarte leren hoes voor extra bescherming en stijl. Met 5G-connectiviteit kunt u genieten van bliksemsnelle download- en uploadsnelheden. Het camerasysteem is top-notch met meerdere lenzen en geavanceerde functies voor prachtige foto's en video's. De telefoon heeft een modern en verfijnd ontwerp met een duurzame bouwkwaliteit. Het bevat ook functies zoals draadloos opladen, water- en stofbestendigheid en een lange batterijduur. De Samsung Galaxy Z Fold 4 512GB 5G + Zwarte leren hoes is een geweldige keuze voor iedereen die op zoek is naar een hoogwaardige en unieke smartphone die de ultieme functionaliteit en stijl biedt.",
      },
      {
        product_id: 10,
        language_id: 'en',
        name: 'Samsung Galaxy Z Fold 4 512GB 5G + Black cover leather',
        short_description: 'Samsung Galaxy Z Fold 4: 5G foldable smartphone with 512GB storage and black leather cover',
        long_description:
          'The Samsung Galaxy Z Fold 4 512GB 5G + Black cover leather is a premium and innovative foldable smartphone with advanced features. It has a unique foldable design that opens up to reveal a large and immersive display, allowing you to multitask and view content like never before. It comes with 512GB of storage for all your apps, photos, and videos, and includes a sleek and stylish black leather cover for added protection and style. With 5G connectivity, you can experience lightning-fast download and upload speeds. The camera system is top-notch with multiple lenses and advanced features for stunning photos and videos. The phone has a modern and sophisticated design with a durable build quality. It also includes features like wireless charging, water and dust resistance, and a long-lasting battery. The Samsung Galaxy Z Fold 4 512GB 5G + Black cover leather is a great choice for anyone looking for a high-end and unique smartphone that offers the ultimate in functionality and style.',
      },
      {
        product_id: 11,
        language_id: 'nl',
        name: 'Samsung Galaxy Z Fold 4 512GB 5G',
        short_description: 'Samsung Galaxy Z Fold 4: 5G-opvouwbare smartphone met 512GB opslag',
        long_description:
          "De Samsung Galaxy Z Fold 4 512GB 5G is een premium en geavanceerde opvouwbare smartphone met indrukwekkende functies. Het heeft een uniek opvouwbaar ontwerp dat zich opent om een ​​groot en meeslepend display te onthullen, waardoor u kunt multitasken en inhoud kunt bekijken zoals nooit tevoren. Met 5G-connectiviteit kunt u genieten van razendsnelle download- en uploadsnelheden en vloeiende prestaties. Het bevat een enorme opslagcapaciteit van 512GB voor al uw apps, foto's en video's, waardoor u meer dan genoeg ruimte heeft voor al uw belangrijke bestanden. Het camerasysteem is van topkwaliteit met meerdere lenzen en geavanceerde functies voor geweldige foto's en video's. De Samsung Galaxy Z Fold 4 512GB 5G heeft een modern en verfijnd ontwerp met een duurzame bouwkwaliteit. Het bevat ook functies zoals draadloos opladen, water- en stofbestendigheid en een lange batterijduur. De Samsung Galaxy Z Fold 4 512GB 5G is een uitstekende keuze voor iedereen die op zoek is naar een unieke en hoogwaardige smartphone met de nieuwste technologie en innovatieve functies.",
      },
      {
        product_id: 11,
        language_id: 'en',
        name: 'Samsung Galaxy Z Fold 4 512GB 5G',
        short_description: 'Samsung Galaxy Z Fold 4: 5G foldable smartphone with 512GB storage',
        long_description:
          'The Samsung Galaxy Z Fold 4 512GB 5G is a premium and advanced foldable smartphone with impressive features. It has a unique foldable design that opens up to reveal a large and immersive display, allowing you to multitask and view content like never before. With 5G connectivity, you can enjoy lightning-fast download and upload speeds and smooth performance. It features a massive storage capacity of 512GB for all your apps, photos, and videos, giving you more than enough space for all your important files. The camera system is top-of-the-line with multiple lenses and advanced features for great photos and videos. The Samsung Galaxy Z Fold 4 512GB 5G has a modern and sophisticated design with a durable build quality. It also includes features such as wireless charging, water and dust resistance, and long battery life. The Samsung Galaxy Z Fold 4 512GB 5G is an excellent choice for anyone looking for a unique and high-end smartphone with the latest technology and innovative features.',
      },
      {
        product_id: 12,
        language_id: 'nl',
        name: 'Samsung HW-Q990B',
        short_description: 'Samsung Galaxy Tab S8 Ultra: De ultieme tablet voor werk en ontspanning',
        long_description:
          'De Samsung HW-Q990B is een premium soundbar die uitzonderlijke geluidskwaliteit levert met ondersteuning voor Dolby Atmos en DTS:X. Het beschikt over 7.1.4 kanaals audio en een krachtige draadloze subwoofer die diepe en meeslepende bassen produceert. De soundbar bevat ook Adaptive Sound technologie die automatisch het geluid aanpast aan de content die je bekijkt, waardoor je een gepersonaliseerde audiobeleving krijgt. Met ingebouwde Amazon Alexa en SmartThings compatibiliteit kun je je soundbar bedienen met je stem en eenvoudig verbinden met andere slimme apparaten. De HW-Q990B ondersteunt ook 4K HDR10+ video pass-through, zodat je van je favoriete content kunt genieten in verbluffende detail. Met zijn strakke en moderne ontwerp is de Samsung HW-Q990B de perfecte aanvulling op elke home entertainment setup.',
      },
      {
        product_id: 12,
        language_id: 'en',
        name: 'Samsung HW-Q990B',
        short_description: 'Samsung HW-Q990B: Premium soundbar with Dolby Atmos and DTS:X support',
        long_description:
          "The Samsung HW-Q990B is a premium soundbar that delivers exceptional sound quality with Dolby Atmos and DTS:X support. It features 7.1.4 channel audio and a powerful wireless subwoofer that produces deep and immersive bass. The soundbar also includes Adaptive Sound technology that automatically adjusts the sound to the content you're watching, providing a personalized audio experience. With built-in Amazon Alexa and SmartThings compatibility, you can control your soundbar with your voice and easily connect it to your other smart devices. The HW-Q990B also supports 4K HDR10+ video pass-through, so you can enjoy your favorite content in stunning detail. With its sleek and modern design, the Samsung HW-Q990B is the perfect addition to any home entertainment setup.",
      },
      {
        product_id: 13,
        language_id: 'nl',
        name: 'Samsung Galaxy Tab S8 ultra',
        short_description: 'Samsung Galaxy Tab S8 Ultra: Krachtige en veelzijdige tablet met groot scherm',
        long_description:
          'De Samsung Galaxy Tab S8 Ultra is een krachtige en veelzijdige tablet met een groot 14,6-inch scherm dat een meeslepende kijkervaring biedt. Met een krachtige Qualcomm Snapdragon 895-processor en tot 12GB RAM levert deze tablet razendsnelle prestaties en is hij in staat om zelfs de meest veeleisende apps en games uit te voeren. De Tab S8 Ultra beschikt ook over een lange batterijduur die kan bijhouden met jouw drukke levensstijl, met tot 12 uur video afspelen op een enkele lading. Met zijn S Pen ondersteuning en Samsung DeX-modus is het een geweldige productiviteitstool, waarmee je gemakkelijk notities kunt maken, tekenen en werken aan documenten. De tablet heeft ook een geavanceerd camerasysteem, met een 13MP camera aan de voorkant en dubbele cameras aan de achterkant (13MP + 5MP) die prachtige fotos en videos vastleggen. Met 5G-connectiviteit kun je onderweg verbonden blijven en genieten van snelle download- en uploadsnelheden. De Samsung Galaxy Tab S8 Ultra is de ultieme tablet voor power users en professionals die een apparaat nodig hebben dat kan voldoen aan hun veeleisende behoeften.',
      },
      {
        product_id: 13,
        language_id: 'en',
        name: 'Withings Body',
        short_description: 'Samsung Galaxy Tab S8 Ultra: The ultimate tablet for work and play',
        long_description:
          "The Samsung Galaxy Tab S8 Ultra is the ultimate tablet for work and play. With a massive 14.6-inch display and 120Hz refresh rate, you can enjoy stunning visuals and smooth scrolling. Powered by the latest Qualcomm Snapdragon 8cx Gen 3 processor and 5G connectivity, this tablet delivers lightning-fast performance for all your productivity needs. Whether you're working on documents or creating digital art, the S Pen provides precise and natural handwriting and drawing capabilities. With a massive 12,000mAh battery, you can use the Tab S8 Ultra all day without worrying about running out of power. And with Samsung DeX and multi-active window support, you can easily switch between multiple apps and work on multiple tasks simultaneously. Plus, with quad speakers tuned by AKG, you can enjoy immersive audio for your favorite movies, music, and games. The Samsung Galaxy Tab S8 Ultra is the perfect tablet for anyone who wants to work and play on the go.",
      },
      {
        product_id: 14,
        language_id: 'nl',
        name: 'Samsung QD OLED 65S95B (2022)',
        short_description: 'Samsung 65S95B QD OLED 4K TV',
        long_description:
          'Geniet van levendige kleuren en verbluffend contrast met de Samsung QD OLED 65S95B (2022) 4K TV. Met quantum dot-technologie en OLED-display levert deze TV een meeslepende kijkervaring zoals geen ander. Bovendien beschikt het over geavanceerde geluids- en Smart TV-mogelijkheden voor een naadloze entertainmentervaring.',
      },
      {
        product_id: 14,
        language_id: 'en',
        name: 'Samsung QD OLED 65S95B (2022)',
        short_description: 'Samsung 65S95B QD OLED 4K TV',
        long_description:
          'Enjoy vivid colors and stunning contrast with the Samsung QD OLED 65S95B (2022) 4K TV. With quantum dot technology and OLED display, this TV delivers an immersive viewing experience like no other. Plus, it features advanced sound and smart TV capabilities for a truly seamless entertainment experience.',
      },
      {
        product_id: 15,
        language_id: 'nl',
        name: 'Samsung QD OLED 55S95B (2022)',
        short_description: 'Samsung 55S95B QD OLED 4K TV',
        long_description:
          'Ervaar levendige kleuren en diep zwart met de Samsung QD OLED 55S95B (2022) 4K TV. Met quantum dot-technologie en OLED-display biedt deze TV een meeslepende beeldkwaliteit. Met geavanceerde geluids- en Smart TV-mogelijkheden zorgt het voor een naadloze entertainmentervaring.',
      },
      {
        product_id: 15,
        language_id: 'en',
        name: 'Samsung QD OLED 55S95B (2022)',
        short_description: 'Samsung 55S95B QD OLED 4K TV',
        long_description:
          'Experience vivid colors and deep blacks with the Samsung QD OLED 55S95B (2022) 4K TV. Featuring quantum dot technology and OLED display, this TV delivers immersive picture quality. With advanced sound and smart TV capabilities, it provides a seamless entertainment experience.',
      },
      {
        product_id: 16,
        language_id: 'nl',
        name: 'Philips 48OLED807 - Ambilight (2022)',
        short_description: 'Philips 48OLED807 Ambilight 4K TV',
        long_description:
          'Ervaar verbluffende beeldkwaliteit en meeslepende Ambilight met de Philips 48OLED807 (2022) 4K TV. Met OLED-display en geavanceerde geluidskwaliteit biedt deze TV een echte bioscoopervaring. Bovendien heeft het Smart TV-mogelijkheden voor een naadloze entertainmentervaring.',
      },
      {
        product_id: 16,
        language_id: 'en',
        name: 'Philips 48OLED807 - Ambilight (2022)',
        short_description: 'Philips 48OLED807 Ambilight 4K TV',
        long_description:
          'Experience stunning picture quality and immersive ambilight with the Philips 48OLED807 (2022) 4K TV. Featuring OLED display and advanced sound, it delivers a truly cinematic experience. Plus, it features smart TV capabilities for a seamless entertainment experience.',
      },
      {
        product_id: 17,
        language_id: 'nl',
        name: 'LG OLED42C24LA (2022) + Soundbar',
        short_description: 'LG OLED42C24LA 4K TV + Soundbar',
        long_description:
          'Geniet van meeslepende beeld- en geluidskwaliteit met de LG OLED42C24LA (2022) 4K TV en bijbehorende soundbar. Met OLED-display en geavanceerde geluidstechnologie biedt deze TV een bioscoopervaring. Bovendien heeft het Smart TV-mogelijkheden voor eenvoudig streamen en browsen.',
      },
      {
        product_id: 17,
        language_id: 'en',
        name: 'LG OLED42C24LA (2022) + Soundbar',
        short_description: 'LG OLED42C24LA 4K TV + Soundbar',
        long_description:
          'Enjoy immersive picture and sound quality with the LG OLED42C24LA (2022) 4K TV and included soundbar. Featuring OLED display and advanced sound technology, this TV delivers a cinematic experience. Plus, it features smart TV capabilities for easy streaming and browsing.',
      },
      {
        product_id: 18,
        language_id: 'nl',
        name: 'Seagate Expansion Portable 5TB',
        short_description: 'Seagate 5TB draagbare HDD',
        long_description:
          'De Seagate Expansion Portable 5TB HDD is de perfecte oplossing voor opslag onderweg. Met een enorme opslagcapaciteit van 5TB kunt u al uw bestanden, fotos en videos op één plek bewaren. Het compacte ontwerp maakt het gemakkelijk om overal mee naartoe te nemen, terwijl de snelle overdrachtssnelheden het gemakkelijk maken om uw bestanden te openen en te delen. Bovendien is het dankzij plug-and-play functionaliteit gemakkelijk te gebruiken direct uit de doos.',
      },
      {
        product_id: 18,
        language_id: 'en',
        name: 'Seagate Expansion Portable 5TB',
        short_description: 'Seagate 5TB Portable HDD',
        long_description:
          'The Seagate Expansion Portable 5TB HDD is the perfect solution for on-the-go storage needs. With a massive 5TB of space, you can store all your files, photos, and videos in one place. Its compact design allows you to take it with you anywhere, while its fast transfer speeds make it easy to access and share your files. Plus, with plug-and-play functionality, its easy to use right out of the box.',
      },
      {
        product_id: 19,
        language_id: 'nl',
        name: 'Seagate Expansion Portable 2TB',
        short_description: 'Seagate 2TB draagbare HDD',
        long_description:
          'De Seagate Expansion Portable 2TB HDD is de perfecte oplossing voor opslag onderweg. Met een enorme opslagcapaciteit van 2TB kunt u al uw bestanden, fotos en videos op één plek bewaren. Het compacte ontwerp maakt het gemakkelijk om overal mee naartoe te nemen, terwijl de snelle overdrachtssnelheden het gemakkelijk maken om uw bestanden te openen en te delen. Bovendien is het dankzij plug-and-play functionaliteit gemakkelijk te gebruiken direct uit de doos.',
      },
      {
        product_id: 19,
        language_id: 'en',
        name: 'Seagate Expansion Portable 2TB',
        short_description: 'Seagate 2TB portable HDD',
        long_description:
          'The Seagate Expansion Portable 2TB HDD is perfect for storing and accessing all your files on-the-go. With 2TB of storage capacity, it offers plenty of space for your photos, videos, documents, and more. Its compact design makes it easy to carry with you wherever you go, while its fast transfer speeds make accessing and sharing your files a breeze. Plus, its plug-and-play, so its ready to use right out of the box.',
      },
      {
        product_id: 20,
        language_id: 'nl',
        name: 'Inventum TMO430',
        short_description: 'Inventum magnetron',
        long_description: 'De Inventum TMO430 magnetron heeft een ruime capaciteit van 20 liter en 5 vermogensniveaus, waardoor het gemakkelijk is om een verscheidenheid aan gerechten te bereiden. Met een maximaal vermogen van 700 watt kan het snel en gelijkmatig uw voedsel verwarmen. De eenvoudig te gebruiken bedieningselementen en het digitale display maken het instellen van de kooktijd en vermogensniveaus gemakkelijk. En met functies zoals een ontdooifunctie en een draaiende glazen draaiplateau is het een veelzijdig apparaat voor elke keuken. Bovendien is het slanke en compacte ontwerp een geweldige ruimtebesparende oplossing.',
      },
      {
        product_id: 20,
        language_id: 'en',
        name: 'Inventum TMO430',
        short_description: 'Inventum microwave oven',
        long_description: 'The Inventum TMO430 microwave oven offers a spacious 20-liter capacity and 5 power levels, making it easy to prepare a variety of dishes. With a maximum power output of 700 watts, it can quickly and evenly heat up your food. The easy-to-use controls and digital display allow you to set cooking times and power levels with ease. And with features like a defrost function and a rotating glass turntable, its a versatile appliance for any kitchen. Plus, its sleek and compact design makes it a great space-saving solution.',
      },
    ]);
  },
};