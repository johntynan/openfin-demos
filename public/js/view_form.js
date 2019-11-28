import { html, render } from 'https://unpkg.com/lit-html@1.0.0/lit-html.js';


class ViewForm extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.createView = this.createView.bind(this);
        this.generateDefaultConfig = this.generateDefaultConfig.bind(this);
        this.addToView = this.addToView.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.window = fin.Window.getCurrentSync();
        this.saveSnapshot = this.saveSnapshot.bind(this);
        this.applySnapshot = this.applySnapshot.bind(this);
        this.launchGenerator = this.launchGenerator.bind(this);

        this.viewList = [];

        //this could be done better.
        fin.Application.getCurrentSync().on('window-initialized', this.render);
        fin.Application.getCurrentSync().on('window-closed', this.render);
        this.render();
    }

    async render() {
        this.url1Default = '';
        this.url2Default = '';
        this.url3Default = '';
        this.urlToAdd = '';

        //Hard coded code here, caution:
        const app = fin.Application.getCurrentSync();
        const wins = await app.getChildWindows();

        this.selectedWindow = wins[0].identity.name;
        
    
        const vForm = html`<input type="number" id="NextWindowName" style="visibility: hidden">
        <div>
            <fieldset>
				<label for="Posts">Select Post</label>
            	<select id='Posts' onChange='launchPostWindows(this)'>
        		<!-- switch betwen the two select tags to switch between the two versions of the apps which have yet to be reconciled -->
        		<!-- select id="Posts" onChange="launchPostWindows(this)" -->
					<option value="Abidjan, Cote D'ivoire" data-location="5.3599517, -4.0082563">Abidjan, Cote D'ivoire</option>
			        <option value="Abu Dhabi, United Arab Emirates" data-location="24.4538840, 54.3773438">Abu Dhabi, United Arab Emirates</option>
			        <option value="Abuja, Nigeria" data-location="9.0764785, 7.3985740">Abuja, Nigeria</option>
			        <option value="Accra, Ghana" data-location="5.6037168, -0.1869644">Accra, Ghana</option>
			        <option value="Adana, Turkey" data-location="36.9914194, 35.3308285">Adana, Turkey</option>
			        <option value="Addis Ababa, Ethiopia" data-location="8.9806034, 38.7577605">Addis Ababa, Ethiopia</option>
			        <option value="Adelaide, Australia" data-location="-34.9284989, 138.6007456">Adelaide, Australia</option>
			        <option value="Adliya, Bahrain" data-location="26.2144884, 50.5847544">Adliya, Bahrain</option>
			        <option value="Aguadilla, Puerto Rico" data-location="18.4274454, -67.1540698">Aguadilla, Puerto Rico</option>
			        <option value="Ahmedabad, India" data-location="23.0225050, 72.5713621">Ahmedabad, India</option>
			        <option value="Al Ain, United Arab Emirates" data-location="24.1301619, 55.8023118">Al Ain, United Arab Emirates
			        </option>
			        <option value="Al Khor, Qatar" data-location="25.6804078, 51.4968502">Al Khor, Qatar</option>
			        <option value="Alexandria, Egypt" data-location="31.2000924, 29.9187387">Alexandria, Egypt</option>
			        <option value="Algiers, Algeria" data-location="36.7537680, 3.0587561">Algiers, Algeria</option>
			        <option value="Almaty, Kazakhstan" data-location="43.2220146, 76.8512485">Almaty, Kazakhstan</option>
			        <option value="Amman, Jordan" data-location="31.9539494, 35.9106350">Amman, Jordan</option>
			        <option value="Amsterdam, The Netherlands" data-location="52.3666969, 4.8945398">Amsterdam, The Netherlands
			        </option>
			        <option value="Anchorage, AK" data-location="61.2180556, -149.9002778">Anchorage, AK, United States of America
			        </option>
			        <option value="Angeles City, Philippines" data-location="15.1449853, 120.5887029">Angeles City, Philippines
			        </option>
			        <option value="Angers, France" data-location="47.4711616, -0.5518257">Angers, France</option>
			        <option value="Ankara, Turkey" data-location="39.9333635, 32.8597419">Ankara, Turkey</option>
			        <option value="Antananarivo, Madagascar" data-location="-18.8791902, 47.5079055">Antananarivo, Madagascar
			        </option>
			        <option value="Antibes, France" data-location="43.5804180, 7.1251020">Antibes, France</option>
			        <option value="Apia, Samoa" data-location="-13.8506958, -171.7513551">Apia, Samoa</option>
			        <option value="Arlington, VA" data-location="38.8816208, -77.0909809">Arlington, VA, United States of America
			        </option>
			        <option value="Arusha, Tanzania" data-location="-3.3869254, 36.6829927">Arusha, Tanzania</option>
			        <option value="Ashgabat, Turkmenistan" data-location="37.9600766, 58.3260629">Ashgabat, Turkmenistan</option>
			        <option value="Asmara, Eritrea" data-location="15.3228767, 38.9250517">Asmara, Eritrea</option>
			        <option value="Astana, Kazakhstan" data-location="51.1605227, 71.4703558">Astana, Kazakhstan</option>
			        <option value="Asuncion, Paraguay" data-location="-25.2637399, -57.5759260">Asuncion, Paraguay</option>
			        <option value="Atenas, Costa Rica" data-location="9.9784936, -84.3738394">Atenas, Costa Rica</option>
			        <option value="Athens, Greece" data-location="37.9838096, 23.7275388">Athens, Greece</option>
			        <option value="Auckland, New Zealand" data-location="-36.8484597, 174.7633315">Auckland, New Zealand</option>
			        <option value="Baghdad, Iraq" data-location="33.3152410, 44.3660671">Baghdad, Iraq</option>
			        <option value="Baja California Sur, Mexico" data-location="26.0444446, -111.6660725">Baja California Sur, Mexico
			        </option>
			        <option value="Baku, Azerbaijan" data-location="40.4092617, 49.8670924">Baku, Azerbaijan</option>
			        <option value="Ballina, Ireland" data-location="54.1149482, -9.1550693">Ballina, Ireland</option>
			        <option value="Bamako, Mali" data-location="12.6392316, -8.0028892">Bamako, Mali</option>
			        <option value="Bandar Seri Begawan, Brunei" data-location="4.9030522, 114.9398210">Bandar Seri Begawan, Brunei
			        </option>
			        <option value="Bangalore, India" data-location="12.9715987, 77.5945627">Bangalore, India</option>
			        <option value="Bangkok, Thailand" data-location="13.7563309, 100.5017651">Bangkok, Thailand</option>
			        <option value="Bangui, Central African Republic" data-location="4.3946735, 18.5581899">Bangui, Central African
			          Republic</option>
			        <option value="Banjul, The Gambia" data-location="13.4548761, -16.5790323">Banjul, The Gambia</option>
			        <option value="Baquba, Iraq" data-location="33.7517053, 44.6080708">Baquba, Iraq</option>
			        <option value="Barcelona, Spain" data-location="41.3850639, 2.1734035">Barcelona, Spain</option>
			        <option value="Basel, Switzerland" data-location="47.5595986, 7.5885761">Basel, Switzerland</option>
			        <option value="Bath, United Kingdom" data-location="51.3810641, -2.3590167">Bath, United Kingdom</option>
			        <option value="Beijing, China" data-location="39.9041999, 116.4073963">Beijing, China</option>
			        <option value="Beirut, Lebanon" data-location="33.8937913, 35.5017767">Beirut, Lebanon</option>
			        <option value="Belfast, United Kingdom" data-location="54.5972850, -5.9301200">Belfast, United Kingdom</option>
			        <option value="Belgrade, Serbia" data-location="44.7865680, 20.4489216">Belgrade, Serbia</option>
			        <option value="Belize City, Belize" data-location="17.5045661, -88.1962133">Belize City, Belize</option>
			        <option value="Belmopan, Belize" data-location="17.2510114, -88.7590201">Belmopan, Belize</option>
			        <option value="Berlin, Germany" data-location="52.5200066, 13.4049540">Berlin, Germany</option>
			        <option value="Bern, Switzerland" data-location="46.9479739, 7.4474468">Bern, Switzerland</option>
			        <option value="Bethesda, MD" data-location="38.9846520, -77.0947092">Bethesda, MD, United States of America
			        </option>
			        <option value="Bishkek, Kyrgyzstan" data-location="42.8746212, 74.5697617">Bishkek, Kyrgyzstan</option>
			        <option value="Bissau, Guinea Bissau" data-location="11.8632196, -15.5843227">Bissau, Guinea Bissau</option>
			        <option value="Blairmore, Scotland" data-location="56.0016060, -4.8995660">Blairmore, Scotland</option>
			        <option value="Bogota, Colombia" data-location="4.7109886, -74.0720920">Bogota, Colombia</option>
			        <option value="Brasilia, Brazil" data-location="-15.8266910, -47.9218204">Brasilia, Brazil</option>
			        <option value="Bratislava, Slovakia" data-location="48.1485965, 17.1077478">Bratislava, Slovakia</option>
			        <option value="Brazzaville, Republic of the Congo" data-location="-4.2633597, 15.2428853">Brazzaville, Republic
			          of the Congo</option>
			        <option value="Bridgetown, Barbados" data-location="13.1059816, -59.6131741">Bridgetown, Barbados</option>
			        <option value="Brussels, Belgium" data-location="50.8503463, 4.3517211">Brussels, Belgium</option>
			        <option value="Bucharest, Romania" data-location="44.4267674, 26.1025384">Bucharest, Romania</option>
			        <option value="Budapest, Hungary" data-location="47.4979120, 19.0402350">Budapest, Hungary</option>
			        <option value="Buenos Aires, Argentina" data-location="-34.6036844, -58.3815591">Buenos Aires, Argentina
			        </option>
			        <option value="Bujumbura, Burundi" data-location="-3.3613780, 29.3598782">Bujumbura, Burundi</option>
			        <option value="Cairo, Egypt" data-location="30.0444196, 31.2357116">Cairo, Egypt</option>
			        <option value="Calgary, Canada" data-location="51.0447331, -114.0718831">Calgary, Canada</option>
			        <option value="Cambridge, United Kingdom" data-location="52.2053370, 0.1218170">Cambridge, United Kingdom
			        </option>
			        <option value="Canberra, Australia" data-location="-35.2809368, 149.1300092">Canberra, Australia</option>
			        <option value="Cape Town, South Africa" data-location="-33.9248685, 18.4240553">Cape Town, South Africa</option>
			        <option value="Caracas, Venezuela" data-location="10.4805937, -66.9036063">Caracas, Venezuela</option>
			        <option value="Cartagena, Colombia" data-location="10.3910485, -75.4794257">Cartagena, Colombia</option>
			        <option value="Casablanca, Morocco" data-location="33.5731104, -7.5898434">Casablanca, Morocco</option>
			        <option value="Catania Sicily, Italy" data-location="37.5078772, 15.0830304">Catania Sicily, Italy</option>
			        <option value="Cha De Igreja, Santo Antao" data-location="17.1573872, -25.1644597">Cha De Igreja, Santo Antao
			        </option>
			        <option value="Chengdu, China" data-location="30.5728150, 104.0668010">Chengdu, China</option>
			        <option value="Chennai, India" data-location="13.0826802, 80.2707184">Chennai, India</option>
			        <option value="Chiang Mai, Thailand" data-location="18.7952876, 98.9620002">Chiang Mai, Thailand</option>
			        <option value="Chisinau, Moldova" data-location="47.0104529, 28.8638102">Chisinau, Moldova</option>
			        <option value="Ciudad Juarez, Mexico" data-location="31.6903638, -106.4245478">Ciudad Juarez, Mexico</option>
			        <option value="Colombo, Sri Lanka" data-location="6.9270786, 79.8612430">Colombo, Sri Lanka</option>
			        <option value="Conakry, Guinea" data-location="9.6411855, -13.5784012">Conakry, Guinea</option>
			        <option value="Copenhagen, Denmark" data-location="55.6760968, 12.5683372">Copenhagen, Denmark</option>
			        <option value="Cotonou, Benin" data-location="6.3702928, 2.3912362">Cotonou, Benin</option>
			        <option value="Dakar, Senegal" data-location="14.7166770, -17.4676861">Dakar, Senegal</option>
			        <option value="Damascus, Syria" data-location="33.5138073, 36.2765279">Damascus, Syria</option>
			        <option value="Dar Es Salaam, Tanzania" data-location="-6.7923540, 39.2083284">Dar Es Salaam, Tanzania</option>
			        <option value="Dhahran, Saudi Arabia" data-location="26.2361248, 50.0393017">Dhahran, Saudi Arabia</option>
			        <option value="Dhaka, Bangladesh" data-location="23.8103320, 90.4125181">Dhaka, Bangladesh</option>
			        <option value="Dili, East Timor" data-location="-8.5568557, 125.5603143">Dili, East Timor</option>
			        <option value="Dingle, Ireland" data-location="52.1409389, -10.2640135">Dingle, Ireland</option>
			        <option value="Djibouti, Djibouti" data-location="11.8251380, 42.5902750">Djibouti, Djibouti</option>
			        <option value="Doha, Qatar" data-location="25.2854473, 51.5310398">Doha, Qatar</option>
			        <option value="Dornbirn, Austria" data-location="47.4124000, 9.7437900">Dornbirn, Austria</option>
			        <option value="Douala, Cameroon" data-location="4.0510564, 9.7678687">Douala, Cameroon</option>
			        <option value="Dubai, United Arab Emirates" data-location="25.2048493, 55.2707828">Dubai, United Arab Emirates
			        </option>
			        <option value="Dublin, Ireland" data-location="53.3498053, -6.2603097">Dublin, Ireland</option>
			        <option value="Dumaguete, Philippines" data-location="9.3068402, 123.3054467">Dumaguete, Philippines</option>
			        <option value="Durban, South Africa" data-location="-29.8586804, 31.0218404">Durban, South Africa</option>
			        <option value="Dushanbe, Tajikistan" data-location="38.5597722, 68.7870384">Dushanbe, Tajikistan</option>
			        <option value="Dusseldorf, Germany" data-location="51.2277411, 6.7734556">Dusseldorf, Germany</option>
			        <option value="East Jerusalem, Palestinian Territories" data-location="31.7683190, 35.2137100">East Jerusalem,
			          Palestinian Territories</option>
			        <option value="Erbil, Iraq" data-location="36.1900730, 43.9930303">Erbil, Iraq</option>
			        <option value="Fairfax, VA" data-location="38.8462236, -77.3063733">Fairfax, VA, United States of America
			        </option>
			        <option value="Florence, Italy" data-location="43.7695604, 11.2558136">Florence, Italy</option>
			        <option value="Fortaleza, Brazil" data-location="-3.7327144, -38.5269981">Fortaleza, Brazil</option>
			        <option value="Frankfurt, Germany" data-location="50.1109221, 8.6821267">Frankfurt, Germany</option>
			        <option value="Freeport, The Bahamas" data-location="26.5333159, -78.6429019">Freeport, The Bahamas</option>
			        <option value="Freetown, Sierra Leone" data-location="8.4656765, -13.2317225">Freetown, Sierra Leone</option>
			        <option value="Fukuoka, Japan" data-location="33.5901838, 130.4016888">Fukuoka, Japan</option>
			        <option value="Gaborone, Botswana" data-location="-24.6282079, 25.9231471">Gaborone, Botswana</option>
			        <option value="Geneva, Switzerland" data-location="46.2043907, 6.1431577">Geneva, Switzerland</option>
			        <option value="Georgetown, Guyana" data-location="6.8012793, -58.1551255">Georgetown, Guyana</option>
			        <option value="Georgetown, Ascension Island" data-location="-7.9262230, -14.4112011">Georgetown, Ascension
			          Island</option>
			        <option value="Granada, Spain" data-location="37.1773363, -3.5985571">Granada, Spain</option>
			        <option value="Grande Baie, Mauritius" data-location="-20.0089204, 57.5816352">Grande Baie, Mauritius</option>
			        <option value="Grenoble, France" data-location="45.1885290, 5.7245240">Grenoble, France</option>
			        <option value="Guadalajara, Mexico" data-location="20.6596988, -103.3496092">Guadalajara, Mexico</option>
			        <option value="Guangzhou, China" data-location="23.1291100, 113.2643850">Guangzhou, China</option>
			        <option value="Guatemala City, Guatemala" data-location="14.6349149, -90.5068824">Guatemala City, Guatemala
			        </option>
			        <option value="Guayaquil, Ecuador" data-location="-2.1894128, -79.8890662">Guayaquil, Ecuador</option>
			        <option value="Halifax, Canada" data-location="44.6487635, -63.5752387">Halifax, Canada</option>
			        <option value="Hamburg, Germany" data-location="53.5510846, 9.9936819">Hamburg, Germany</option>
			        <option value="Hamilton, Bermuda" data-location="32.2945837, -64.7858887">Hamilton, Bermuda</option>
			        <option value="Hanoi, Vietnam" data-location="21.0277644, 105.8341598">Hanoi, Vietnam</option>
			        <option value="Harare, Zimbabwe" data-location="-17.8251657, 31.0335100">Harare, Zimbabwe</option>
			        <option value="Havana, Cuba" data-location="23.1135925, -82.3665956">Havana, Cuba</option>
			        <option value="Helsinki, Finland" data-location="60.1698557, 24.9383791">Helsinki, Finland</option>
			        <option value="Hermosillo, Mexico" data-location="29.0729673, -110.9559192">Hermosillo, Mexico</option>
			        <option value="Herzliya Pituach, Israel" data-location="32.1742020, 34.8029320">Herzliya Pituach, Israel
			        </option>
			        <option value="Ho Chi Minh City, Vietnam" data-location="10.8230989, 106.6296638">Ho Chi Minh City, Vietnam
			        </option>
			        <option value="Hong Kong, China" data-location="22.3193039, 114.1693611">Hong Kong, China</option>
			        <option value="Honiara, Solomon Islands" data-location="-9.4456381, 159.9728999">Honiara, Solomon Islands
			        </option>
			        <option value="Honolulu, HI" data-location="21.3069444, -157.8583333">Honolulu, HI, United States of America
			        </option>
			        <option value="Houston, TX" data-location="29.7604267, -95.3698028">Houston, TX, United States of America
			        </option>
			        <option value="Hyderabad, India" data-location="17.3850440, 78.4866710">Hyderabad, India</option>
			        <option value="Islamabad, Pakistan" data-location="33.6844202, 73.0478848">Islamabad, Pakistan</option>
			        <option value="Istanbul, Turkey" data-location="41.0082376, 28.9783589">Istanbul, Turkey</option>
			        <option value="Jakarta, Indonesia" data-location="-6.2087634, 106.8455990">Jakarta, Indonesia</option>
			        <option value="Jeddah, Saudi Arabia" data-location="21.4858110, 39.1925048">Jeddah, Saudi Arabia</option>
			        <option value="Jerusalem, Israel" data-location="31.7683190, 35.2137100">Jerusalem, Israel</option>
			        <option value="Johannesburg, South Africa" data-location="-26.2041028, 28.0473051">Johannesburg, South Africa
			        </option>
			        <option value="Kabul, Afghanistan" data-location="34.5553494, 69.2074860">Kabul, Afghanistan</option>
			        <option value="Kampala, Uganda" data-location="0.3475964, 32.5825197">Kampala, Uganda</option>
			        <option value="Kaohsiung, Taiwan" data-location="22.6272784, 120.3014353">Kaohsiung, Taiwan</option>
			        <option value="Karachi, Pakistan" data-location="24.8607343, 67.0011364">Karachi, Pakistan</option>
			        <option value="Kathmandu, Nepal" data-location="27.7172453, 85.3239605">Kathmandu, Nepal</option>
			        <option value="Keflavik, Iceland" data-location="63.9997549, -22.5582716">Keflavik, Iceland</option>
			        <option value="Khartoum, Sudan" data-location="15.5006544, 32.5598994">Khartoum, Sudan</option>
			        <option value="Kherson, Ukraine" data-location="46.6354170, 32.6168670">Kherson, Ukraine</option>
			        <option value="Kiev, Ukraine" data-location="50.4501000, 30.5234000">Kiev, Ukraine</option>
			        <option value="Kigali, Rwanda" data-location="-1.9705786, 30.1044288">Kigali, Rwanda</option>
			        <option value="Kingston, Jamaica" data-location="18.0178743, -76.8099041">Kingston, Jamaica</option>
			        <option value="Kinshasa, Democratic Republic of the Congo" data-location="-4.4419311, 15.2662931">Kinshasa,
			          Democratic Republic of the Congo</option>
			        <option value="Kirkuk, Iraq" data-location="35.4666329, 44.3798895">Kirkuk, Iraq</option>
			        <option value="Kobe, Japan" data-location="34.6900806, 135.1956311">Kobe, Japan</option>
			        <option value="Kolkata, India" data-location="22.5726460, 88.3638950">Kolkata, India</option>
			        <option value="Kolonia, Federated States Of Micronesia" data-location="6.9641667, 158.2083333">Kolonia,
			          Federated States Of Micronesia</option>
			        <option value="Krakow, Poland" data-location="50.0646501, 19.9449799">Krakow, Poland</option>
			        <option value="Kuala Lumpur, Malaysia" data-location="3.1390030, 101.6868550">Kuala Lumpur, Malaysia</option>
			        <option value="Kuwait City, Kuwait" data-location="29.3758590, 47.9774052">Kuwait City, Kuwait</option>
			        <option value="La Paz, Bolivia" data-location="-16.4896890, -68.1192936">La Paz, Bolivia</option>
			        <option value="La Union, Philippines" data-location="16.6158906, 120.3209373">La Union, Philippines</option>
			        <option value="Lagos, Nigeria" data-location="6.5243793, 3.3792057">Lagos, Nigeria</option>
			        <option value="Larnaca, Cyprus" data-location="34.9002535, 33.6231723">Larnaca, Cyprus</option>
			        <option value="Leipzig, Germany" data-location="51.3396955, 12.3730747">Leipzig, Germany</option>
			        <option value="Libreville, Gabon" data-location="0.4161976, 9.4672676">Libreville, Gabon</option>
			        <option value="Lilongwe, Malawi" data-location="-13.9626121, 33.7741195">Lilongwe, Malawi</option>
			        <option value="Lima, Peru" data-location="-12.0463731, -77.0427540">Lima, Peru</option>
			        <option value="Lisbon, Portugal" data-location="38.7222524, -9.1393366">Lisbon, Portugal</option>
			        <option value="Ljubljana, Slovenia" data-location="46.0569465, 14.5057515">Ljubljana, Slovenia</option>
			        <option value="Lome, Togo" data-location="6.1256261, 1.2254183">Lome, Togo</option>
			        <option value="London, United Kingdom" data-location="51.5073509, -0.1277583">London, United Kingdom</option>
			        <option value="Luanda, Angola" data-location="-8.8146556, 13.2301756">Luanda, Angola</option>
			        <option value="Lund, Sweden" data-location="55.7046601, 13.1910073">Lund, Sweden</option>
			        <option value="Lusaka, Zambia" data-location="-15.3875259, 28.3228165">Lusaka, Zambia</option>
			        <option value="Luxembourg City, Luxembourg" data-location="49.6116210, 6.1319346">Luxembourg City, Luxembourg
			        </option>
			        <option value="Lyon, France" data-location="45.7640430, 4.8356590">Lyon, France</option>
			        <option value="Maadi, Egypt" data-location="29.9601561, 31.2569138">Maadi, Egypt</option>
			        <option value="Maastricht, The Netherlands" data-location="50.8513682, 5.6909725">Maastricht, The Netherlands
			        </option>
			        <option value="Madrid, Spain" data-location="40.4167754, -3.7037902">Madrid, Spain</option>
			        <option value="Maisons-laffitte, France" data-location="48.9475450, 2.1423899">Maisons-laffitte, France</option>
			        <option value="Majuro, The Republic of Marshall Islands" data-location="7.0860661, 171.3731996">Majuro, The
			          Republic of Marshall Islands</option>
			        <option value="Malabo, Equatorial Guinea" data-location="3.7549606, 8.7821344">Malabo, Equatorial Guinea
			        </option>
			        <option value="Malmo, Sweden" data-location="55.6049810, 13.0038220">Malmo, Sweden</option>
			        <option value="Managua, Nicaragua" data-location="12.1149926, -86.2361744">Managua, Nicaragua</option>
			        <option value="Manama, Bahrain" data-location="26.2235305, 50.5875935">Manama, Bahrain</option>
			        <option value="Mandalay, Myanmar" data-location="21.9588282, 96.0891032">Mandalay, Myanmar</option>
			        <option value="Manila, Philippines" data-location="14.5995124, 120.9842195">Manila, Philippines</option>
			        <option value="Manzini, Swaziland" data-location="-26.5081999, 31.3713164">Manzini, Swaziland</option>
			        <option value="Maputo, Mozambique" data-location="-25.9692480, 32.5731746">Maputo, Mozambique</option>
			        <option value="Maracaibo, Venezuela" data-location="10.6427070, -71.6125366">Maracaibo, Venezuela</option>
			        <option value="Maseru, Lesotho" data-location="-29.3150767, 27.4869229">Maseru, Lesotho</option>
			        <option value="Matamoros, Mexico" data-location="25.8690294, -97.5027376">Matamoros, Mexico</option>
			        <option value="Mbabane, Swaziland" data-location="-26.3054482, 31.1366715">Mbabane, Swaziland</option>
			        <option value="Medan, Indonesia" data-location="3.5951956, 98.6722227">Medan, Indonesia</option>
			        <option value="Medellin, Colombia" data-location="6.2486069, -75.5742467">Medellin, Colombia</option>
			        <option value="Meknes, Morocco" data-location="33.8730164, -5.5407299">Meknes, Morocco</option>
			        <option value="Melaka, Malaysia" data-location="2.1895940, 102.2500868">Melaka, Malaysia</option>
			        <option value="Melbourne, Australia" data-location="-37.8136276, 144.9630576">Melbourne, Australia</option>
			        <option value="Mexico City, Mexico" data-location="19.4326077, -99.1332080">Mexico City, Mexico</option>
			        <option value="Miami, FL" data-location="25.7616798, -80.1917902">Miami, FL, United States of America</option>
			        <option value="Milan, Italy" data-location="45.4642035, 9.1899820">Milan, Italy</option>
			        <option value="Minsk, Belarus" data-location="53.9006011, 27.5589720">Minsk, Belarus</option>
			        <option value="Minya, Egypt" data-location="28.0870967, 30.7618397">Minya, Egypt</option>
			        <option value="Modena, Italy" data-location="44.6471280, 10.9252269">Modena, Italy</option>
			        <option value="Monroe, NC" data-location="34.9854275, -80.5495112">Monroe, NC, United States of America</option>
			        <option value="Monrovia, Liberia" data-location="6.3156068, -10.8073698">Monrovia, Liberia</option>
			        <option value="Monterrey, Mexico" data-location="25.6866142, -100.3161126">Monterrey, Mexico</option>
			        <option value="Montevideo, Uruguay" data-location="-34.9011127, -56.1645314">Montevideo, Uruguay</option>
			        <option value="Montreal, Canada" data-location="45.5016889, -73.5672560">Montreal, Canada</option>
			        <option value="Moscow, Russia" data-location="55.7558260, 37.6172999">Moscow, Russia</option>
			        <option value="Mumbai, India" data-location="19.0759837, 72.8776559">Mumbai, India</option>
			        <option value="Munich, Germany" data-location="48.1351253, 11.5819805">Munich, Germany</option>
			        <option value="Muscat, Oman" data-location="23.5880307, 58.3828717">Muscat, Oman</option>
			        <option value="N'djamena, Chad" data-location="12.1348457, 15.0557415">N'djamena, Chad</option>
			        <option value="Nairobi, Kenya" data-location="-1.2920659, 36.8219462">Nairobi, Kenya</option>
			        <option value="Naples, Italy" data-location="40.8517983, 14.2681200">Naples, Italy</option>
			        <option value="Nassau, The Bahamas" data-location="25.0443312, -77.3503609">Nassau, The Bahamas</option>
			        <option value="Nea Smyrni, Greece" data-location="37.9444167, 23.7127056">Nea Smyrni, Greece</option>
			        <option value="New Delhi, India" data-location="28.6139391, 77.2090212">New Delhi, India</option>
			        <option value="Niamey, Niger" data-location="13.5115963, 2.1253854">Niamey, Niger</option>
			        <option value="Nicosia, Cyprus" data-location="35.1855659, 33.3822764">Nicosia, Cyprus</option>
			        <option value="Nijmegen, The Netherlands" data-location="51.8448837, 5.8428281">Nijmegen, The Netherlands
			        </option>
			        <option value="Ningbo, China" data-location="29.8683360, 121.5439900">Ningbo, China</option>
			        <option value="Nouakchott, Mauritania" data-location="18.0735299, -15.9582372">Nouakchott, Mauritania</option>
			        <option value="Nuevo Laredo, Mexico" data-location="27.4779362, -99.5495730">Nuevo Laredo, Mexico</option>
			        <option value="Okinawa, Japan" data-location="26.1201911, 127.7025012">Okinawa, Japan</option>
			        <option value="Online School, Online Schools" data-location="36.7288277, -95.9502170">Online School, Online
			          Schools</option>
			        <option value="Ontario, Canada" data-location="51.2537750, -85.3232140">Ontario, Canada</option>
			        <option value="Osaka, Japan" data-location="34.6937249, 135.5022535">Osaka, Japan</option>
			        <option value="Oslo, Norway" data-location="59.9138688, 10.7522454">Oslo, Norway</option>
			        <option value="Ottawa, Canada" data-location="45.4215296, -75.6971931">Ottawa, Canada</option>
			        <option value="Ouagadougou, Burkina Faso" data-location="12.3714277, -1.5196603">Ouagadougou, Burkina Faso
			        </option>
			        <option value="Oxfordshire, United Kingdom" data-location="51.7612056, -1.2464674">Oxfordshire, United Kingdom
			        </option>
			        <option value="Pago Pago, American Samoa" data-location="-14.2756319, -170.7020359">Pago Pago, American Samoa
			        </option>
			        <option value="Panama City, Panama" data-location="8.9823792, -79.5198696">Panama City, Panama</option>
			        <option value="Paramaribo, Suriname" data-location="5.8520355, -55.2038278">Paramaribo, Suriname</option>
			        <option value="Paris, France" data-location="48.8566140, 2.3522219">Paris, France</option>
			        <option value="Perth, Australia" data-location="-31.9505269, 115.8604572">Perth, Australia</option>
			        <option value="Peshawar, Pakistan" data-location="34.0151366, 71.5249154">Peshawar, Pakistan</option>
			        <option value="Peterborough, Canada" data-location="44.3090580, -78.3197470">Peterborough, Canada</option>
			        <option value="Phnom Penh, Cambodia" data-location="11.5563738, 104.9282099">Phnom Penh, Cambodia</option>
			        <option value="Phuket, Thailand" data-location="7.9519331, 98.3380884">Phuket, Thailand</option>
			        <option value="Podgorica, Montenegro" data-location="42.4304196, 19.2593642">Podgorica, Montenegro</option>
			        <option value="Port Au Prince, Haiti" data-location="18.5943950, -72.3074326">Port Au Prince, Haiti</option>
			        <option value="Port Harcourt, Nigeria" data-location="4.8155540, 7.0498442">Port Harcourt, Nigeria</option>
			        <option value="Port Louis, Mauritius" data-location="-20.1608912, 57.5012222">Port Louis, Mauritius</option>
			        <option value="Port Moresby, Papua New Guinea" data-location="-9.4438004, 147.1802671">Port Moresby, Papua New
			          Guinea</option>
			        <option value="Port Of Spain, Trinidad And Tobago" data-location="10.6495918, -61.5142371">Port Of Spain,
			          Trinidad And Tobago</option>
			        <option value="Porto Alegre, Brazil" data-location="-30.0346471, -51.2176584">Porto Alegre, Brazil</option>
			        <option value="Prague, Czech Republic" data-location="50.0755381, 14.4378005">Prague, Czech Republic</option>
			        <option value="Praia, Cape Verde" data-location="14.9330500, -23.5133267">Praia, Cape Verde</option>
			        <option value="Pretoria, South Africa" data-location="-25.7478676, 28.2292712">Pretoria, South Africa</option>
			        <option value="Pristina, Kosovo" data-location="42.6629138, 21.1655028">Pristina, Kosovo</option>
			        <option value="Quebec, Canada" data-location="52.9399159, -73.5491361">Quebec, Canada</option>
			        <option value="Queretaro, Mexico" data-location="20.5887932, -100.3898881">Queretaro, Mexico</option>
			        <option value="Quito, Ecuador" data-location="-0.1806532, -78.4678382">Quito, Ecuador</option>
			        <option value="Rabat, Morocco" data-location="33.9715904, -6.8498129">Rabat, Morocco</option>
			        <option value="Ramallah, Palestinian Territories" data-location="31.9521620, 35.2331540">Ramallah, Palestinian
			          Territories</option>
			        <option value="Recife, Brazil" data-location="-8.0522404, -34.9286096">Recife, Brazil</option>
			        <option value="Reykjavik, Iceland" data-location="64.1465820, -21.9426354">Reykjavik, Iceland</option>
			        <option value="Riga, Latvia" data-location="56.9496487, 24.1051865">Riga, Latvia</option>
			        <option value="Rio De Janeiro, Brazil" data-location="-22.9068467, -43.1728965">Rio De Janeiro, Brazil</option>
			        <option value="Riyadh, Saudi Arabia" data-location="24.7135517, 46.6752957">Riyadh, Saudi Arabia</option>
			        <option value="Rome, Italy" data-location="41.9027835, 12.4963655">Rome, Italy</option>
			        <option value="Rotterdam, The Netherlands" data-location="51.9244201, 4.4777326">Rotterdam, The Netherlands
			        </option>
			        <option value="Salwa, Kuwait" data-location="29.2964866, 48.0793790">Salwa, Kuwait</option>
			        <option value="Salzburg, Austria" data-location="47.8094900, 13.0550100">Salzburg, Austria</option>
			        <option value="San Carlos De Bariloche, Argentina" data-location="-41.1334722, -71.3102778">San Carlos De
			          Bariloche, Argentina</option>
			        <option value="San Jose, Costa Rica" data-location="9.9280694, -84.0907246">San Jose, Costa Rica</option>
			        <option value="San Juan, Puerto Rico" data-location="18.4655394, -66.1057355">San Juan, Puerto Rico</option>
			        <option value="San Pedro Sula, Honduras" data-location="15.5038827, -88.0138619">San Pedro Sula, Honduras
			        </option>
			        <option value="San Salvador, El Salvador" data-location="13.6929403, -89.2181911">San Salvador, El Salvador
			        </option>
			        <option value="Sanaa, Yemen" data-location="15.3694451, 44.1910066">Sanaa, Yemen</option>
			        <option value="Santiago, Chile" data-location="-33.4488897, -70.6692655">Santiago, Chile</option>
			        <option value="Santo Domingo, Dominican Republic" data-location="18.4860575, -69.9312117">Santo Domingo,
			          Dominican Republic</option>
			        <option value="Sao Paulo, Brazil" data-location="-23.5505199, -46.6333094">Sao Paulo, Brazil</option>
			        <option value="Sapporo, Japan" data-location="43.0617713, 141.3544507">Sapporo, Japan</option>
			        <option value="Sarajevo, Bosnia And Herzegovina" data-location="43.8562586, 18.4130763">Sarajevo, Bosnia And
			          Herzegovina</option>
			        <option value="Seattle, WA" data-location="47.6062095, -122.3320708">Seattle, WA, United States of America
			        </option>
			        <option value="Seoul, South Korea" data-location="37.5665350, 126.9779692">Seoul, South Korea</option>
			        <option value="Shanghai, China" data-location="31.2304160, 121.4737010">Shanghai, China</option>
			        <option value="Shenyang, China" data-location="41.8056990, 123.4314720">Shenyang, China</option>
			        <option value="Shenzhen, China" data-location="22.5430960, 114.0578650">Shenzhen, China</option>
			        <option value="Shijiazhuang, China" data-location="38.0428050, 114.5148930">Shijiazhuang, China</option>
			        <option value="Sichuan Province, China" data-location="30.2638032, 102.8054753">Sichuan Province, China</option>
			        <option value="Silver Spring, MD" data-location="38.9906657, -77.0260880">Silver Spring, MD, United States of
			          America</option>
			        <option value="Singapore, Singapore" data-location="1.3520830, 103.8198360">Singapore, Singapore</option>
			        <option value="Sintra, Portugal" data-location="38.8029127, -9.3816495">Sintra, Portugal</option>
			        <option value="Skopje, Macedonia" data-location="42.0050274, 21.4407659">Skopje, Macedonia</option>
			        <option value="Sofia, Bulgaria" data-location="42.6977082, 23.3218675">Sofia, Bulgaria</option>
			        <option value="Sonora, Mexico" data-location="29.2972247, -110.3308814">Sonora, Mexico</option>
			        <option value="St. Petersburg, Russia" data-location="59.9342802, 30.3350986">St. Petersburg, Russia</option>
			        <option value="Stockholm, Sweden" data-location="59.3293235, 18.0685808">Stockholm, Sweden</option>
			        <option value="Stuttgart, Germany" data-location="48.7758459, 9.1829321">Stuttgart, Germany</option>
			        <option value="Surabaya, Indonesia" data-location="-7.2574719, 112.7520883">Surabaya, Indonesia</option>
			        <option value="Suva, Fiji" data-location="-18.1248086, 178.4500789">Suva, Fiji</option>
			        <option value="Suzhou, China" data-location="31.2989740, 120.5852890">Suzhou, China</option>
			        <option value="Sydney, Australia" data-location="-33.8688197, 151.2092955">Sydney, Australia</option>
			        <option value="Taipei, Taiwan" data-location="25.0329694, 121.5654177">Taipei, Taiwan</option>
			        <option value="Tallinn, Estonia" data-location="59.4369608, 24.7535747">Tallinn, Estonia</option>
			        <option value="Tapachula, Mexico" data-location="14.9055599, -92.2634206">Tapachula, Mexico</option>
			        <option value="Tashkent, Uzbekistan" data-location="41.2994958, 69.2400734">Tashkent, Uzbekistan</option>
			        <option value="Tbilisi, Georgia" data-location="41.7151377, 44.8270960">Tbilisi, Georgia</option>
			        <option value="Tegucigalpa, Honduras" data-location="14.0650490, -87.1715002">Tegucigalpa, Honduras</option>
			        <option value="Tehran, Iran" data-location="35.6891975, 51.3889736">Tehran, Iran</option>
			        <option value="Tel Aviv, Israel" data-location="32.0852999, 34.7817676">Tel Aviv, Israel</option>
			        <option value="Tema, Ghana" data-location="5.7348119, 0.0302354">Tema, Ghana</option>
			        <option value="Tervuren, Belgium" data-location="50.8259264, 4.5077781">Tervuren, Belgium</option>
			        <option value="The Azores, Portugal" data-location="37.7412488, -25.6755944">The Azores, Portugal</option>
			        <option value="The Hague, The Netherlands" data-location="52.0704978, 4.3006999">The Hague, The Netherlands
			        </option>
			        <option value="Thessaloniki, Greece" data-location="40.6400629, 22.9444191">Thessaloniki, Greece</option>
			        <option value="Tianjin, China" data-location="39.3433574, 117.3616476">Tianjin, China</option>
			        <option value="Tijuana, Mexico" data-location="32.5149469, -117.0382471">Tijuana, Mexico</option>
			        <option value="Tirana, Albania" data-location="41.3275459, 19.8186982">Tirana, Albania</option>
			        <option value="Tokyo, Japan" data-location="35.6761919, 139.6503106">Tokyo, Japan</option>
			        <option value="Toronto, Canada" data-location="43.6532260, -79.3831843">Toronto, Canada</option>
			        <option value="Tripoli, Libya" data-location="32.8872094, 13.1913383">Tripoli, Libya</option>
			        <option value="Tunis, Tunisia" data-location="36.8064948, 10.1815316">Tunis, Tunisia</option>
			        <option value="Udon Thani, Thailand" data-location="17.3646969, 102.8158924">Udon Thani, Thailand</option>
			        <option value="Ulaanbaatar, Mongolia" data-location="47.8863988, 106.9057439">Ulaanbaatar, Mongolia</option>
			        <option value="Utrecht, The Netherlands" data-location="52.0907374, 5.1214201">Utrecht, The Netherlands</option>
			        <option value="Valletta, Malta" data-location="35.8989085, 14.5145528">Valletta, Malta</option>
			        <option value="Valparaiso, Chile" data-location="-33.0472380, -71.6126885">Valparaiso, Chile</option>
			        <option value="Vancouver, Canada" data-location="49.2827291, -123.1207375">Vancouver, Canada</option>
			        <option value="Vienna, Austria" data-location="48.2081743, 16.3738189">Vienna, Austria</option>
			        <option value="Vientiane, Laos" data-location="17.9757058, 102.6331035">Vientiane, Laos</option>
			        <option value="Vilnius, Lithuania" data-location="54.6871555, 25.2796514">Vilnius, Lithuania</option>
			        <option value="Vladivostok, Russia" data-location="43.1198091, 131.8869243">Vladivostok, Russia</option>
			        <option value="Warsaw, Poland" data-location="52.2296756, 21.0122287">Warsaw, Poland</option>
			        <option value="Washington, DC" data-location="38.9071923, -77.0368707">Washington, DC, United States of America
			        </option>
			        <option value="Wassenaar, The Netherlands" data-location="52.1429096, 4.4012129">Wassenaar, The Netherlands
			        </option>
			        <option value="Wellington, New Zealand" data-location="-41.2864603, 174.7762360">Wellington, New Zealand
			        </option>
			        <option value="Windhoek, Namibia" data-location="-22.5608807, 17.0657549">Windhoek, Namibia</option>
			        <option value="Winnipeg, Canada" data-location="49.8951360, -97.1383744">Winnipeg, Canada</option>
			        <option value="Wuhan, China" data-location="30.5928490, 114.3055390">Wuhan, China</option>
			        <option value="Yangon, Myanmar" data-location="16.9238579, 96.2269763">Yangon, Myanmar</option>
			        <option value="Yaounde, Cameroon" data-location="3.8480325, 11.5020752">Yaounde, Cameroon</option>
			        <option value="Yei, South Sudan" data-location="4.0952713, 30.6775054">Yei, South Sudan</option>
			        <option value="Yekaterinburg, Russia" data-location="56.8389261, 60.6057025">Yekaterinburg, Russia</option>
			        <option value="Yerevan, Armenia" data-location="40.1872023, 44.5152090">Yerevan, Armenia</option>
			        <option value="York, United Kingdom" data-location="53.9599651, -1.0872979">York, United Kingdom</option>
			        <option value="Zagreb, Croatia" data-location="45.8150108, 15.9819189">Zagreb, Croatia</option>
			        <option value="Zurich, Switzerland" data-location="47.3768866, 8.5416940">Zurich, Switzerland</option>
            	
            	
            	
            	</select>
                <legend>Create a new View</legend>
                <button @click=${this.createView}>Create</button> <br>
                                <legend>Layout</legend>
                <select id='layout'>
	                <option value="grid">Grid</option>
	                <option value="tabbed">Tabbed</option>
	                <option value="fixed">Fixed</option>
				</select>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url1Default}
                    size="50"
                    style="visibility:hidden"
                    @input=${this.handleInput}
                /> <!-- br -->
                <input
                    type="text"
                    id="url2"
                    .value=${this.url2Default}
                    size="50"
                    style="visibility:hidden"
                    @input=${this.handleInput}
                /> <!-- br -->
                <input
                    type="text"
                    id="url3"
                    .value=${this.url3Default}
                    size="50"
                    style="visibility:hidden"
                    @input=${this.handleInput}
                />
            </fieldset>
            <fieldset>
                <legend>Add view to window</legend>
                <button @click=${this.addToView}>Add</button> <br>
               <input
                    type="text"
                    id="url-to-add"
                    size="50"
                    .value=${this.urlToAdd}
                     @input=${this.handleInput}
                /> <br>
                <select id="selected-window">
                    ${wins.map((win) => html`<option value="${win.identity.name}">${win.identity.name}</option>`)}
                </select>
             </fieldset>
          <fieldset>
             <legend>SnapShots</legend>
              <button @click=${this.saveSnapshot}>Save Snapshot</button> <br>
              <button @click=${this.applySnapshot}>Apply Snapshot</button> <br>
          </fieldset>
          <fieldset>
             <legend>Layout Generator</legend>
              <button @click=${this.launchGenerator}>Launch Layout Generator</button> <br>
          </fieldset>
        </div>
            <div style="margin-bottom: 20px">
      <label for="Workspace">Tile Set Name:</label><br />
      <input id="Workspace" /><br />
      <button type="button" onclick="saveWindows()">Save Tiles</button><br /><br />
      <label for="WorkspaceList">Tile Sets:</label><br />
      <select id="WorkspacesList"></select><br />
      <button type="button" onclick="recallWindows()">Recall Tiles</button><br />
      <!--button type="button" onclick="clearWorkspaces()">Clear All</button-->
    </div>`;
        render(vForm, this);
        // render(postsOptions, this);
    }

    async addToView() {
        const urlToAdd = this.querySelector('#url-to-add').value;
        const selectedWindow = this.querySelector('#selected-window').value;
        const { identity: { uuid } } = fin.Application.getCurrentSync();
        const target = { uuid, name: selectedWindow };
        fin.Layout.createView({
            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
            url: urlToAdd
        }, target);
    }

    async createView() {
        try {
            fin.Layout.createWindow({
                layoutConfig: this.generateDefaultConfig()
            });
        } catch (err) {
            console.error(err);
        }
    }

    handleInput(e) {
        this[e.target.id] = e.target.value;
    }

    async saveSnapshot() {
        this.snapshot = await fin.Layout.getSnapshot();
    }

    async applySnapshot() {
        if (this.snapshot) {
            fin.Layout.applySnapshot(this.snapshot);
        }
    }

    async launchGenerator() {
        const configGen = {
            defaultWidth: 1800,
            defaultHeight: 800,
            saveWindowState: false,
            layoutConfig: {
                content: [{
                    type: 'stack',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: 'config-gen',
                            url: location.href.replace('view-form', 'config-gen')
                        }
                    }]
                }]
            }
        };

        try {
            fin.Layout.createWindow(configGen);
        } catch (err) {
            console.error(err);
        }
    }

    generateDefaultConfig() {
        const { identity: { uuid } } = fin.Application.getCurrentSync();
        const selectedLayout = this.querySelector('#layout').value;

        const grid = {
            settings: {
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false,
                constrainDragToContainer: false
            },
            content: [{
                type: 'row',
                content: [{
                    type: 'stack',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url1').value
                        }
                    }]
                }, {
                    type: 'column',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url2').value
                        }
                    }, {
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url3').value
                        }
                    }]
                }]
            }]
        };

        const tabbed = {
            settings: {
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false,
                constrainDragToContainer: false
            },
            content: [{
                type: 'stack',
                content: [{
                    type: 'component',
                    componentName: 'view',
                    componentState: {
                        name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                        url: this.querySelector('#url1').value
                    }
                }, {
                    type: 'component',
                    componentName: 'view',
                    componentState: {
                        name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                        url: this.querySelector('#url2').value
                    }
                }, {
                    type: 'component',
                    componentName: 'view',
                    componentState: {

                        name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                        url: this.querySelector('#url3').value
                    }
                }]
            }]
        };

        const fixed = {
            settings: {
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false,
                constrainDragToContainer: false,
                reorderEnabled: false,
                selectionEnabled: false
            },
            dimensions: {
                borderWidth: 0,
                headerHeight: 0
            },
            content: [{
                type: 'row',
                content: [{
                    type: 'stack',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url1').value
                        }
                    }]
                }, {
                    type: 'column',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url2').value
                        }
                    }, {
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url3').value
                        }
                    }]
                }]
            }]
        };

        switch (selectedLayout) {
            case 'grid':
                return grid;
                break;
            case 'tabbed':
                return tabbed;
                break;
            case 'fixed':
                return fixed;
                break;
            default:
                break;
        }
    }
}

customElements.define('view-form', ViewForm);