const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    languageBtn.addEventListener('click', () => {
      languageDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
      if (!languageBtn.contains(event.target) && !languageDropdown.contains(event.target)) {
        languageDropdown.classList.remove('show');
      }
    });
document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = languageDropdown.querySelectorAll('img');
  
    // ენის ღილაკზე დაკლიკებისას შეიცვლება დისტანცირება
    languageBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // არ აჰყვის სხვა კლიკების ივენთებს
      languageDropdown.style.display = (languageDropdown.style.display === 'block') ? 'none' : 'block';
    });
  
    // დააბრუნეთ ჩამDropdown, თუ გარეთ დაკლიკდება
    document.addEventListener('click', function(e) {
      if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.style.display = 'none';
      }
    });
  
    // ენის თარგმანის ობიექტი
    const translations = {
      ka: {
        logoText: "RenTime",
        property: "უძრავი ქონება",
        car: "ავტომობილები",
        language: "ენა",
        add: "დამატება",
        login: "შესვლა",
        logout: "გამოსვლა",
        mainTitle: "იპოვე შენთვის საუკეთესო",
        propertyTypeLabel: "ქონების ტიპი:",
        propertyStatusLabel: "სტატუსი:",
        propertyLocationLabel: "მდებარეობა:",
        propertyAreaLabel: "ფართი (მ²):",
        propertyPriceLabel: "ფასი:",
        search: "ძებნა"
      },
      ru: {
        logoText: "RenTime",
        property: "Недвижимость",
        car: "Автомобили",
        language: "Язык",
        add: "Добавить",
        login: "Войти",
        logout: "Выйти",
        mainTitle: "Найди лучшее для себя",
        propertyTypeLabel: "Тип недвижимости:",
        propertyStatusLabel: "Статус:",
        propertyLocationLabel: "Местоположение:",
        propertyAreaLabel: "Площадь (м²):",
        propertyPriceLabel: "Цена:",
        search: "Поиск"
      },
      en: {
        logoText: "RenTime",
        property: "Real Estate",
        car: "Cars",
        language: "Language",
        add: "Add",
        login: "Login",
        logout: "Logout",
        mainTitle: "Find the best for you",
        propertyTypeLabel: "Property Type:",
        propertyStatusLabel: "Status:",
        propertyLocationLabel: "Location:",
        propertyAreaLabel: "Area (m²):",
        propertyPriceLabel: "Price:",
        search: "Search"
      }
    };
  
    // ფუნქცია ენის შეცვლისთვის
    function changeLanguage(lang) {
      const trans = translations[lang];
      if (!trans) return;
      document.getElementById('logoText').innerText = trans.logoText;
      document.getElementById('propertyBtnText').innerText = trans.property;
      document.getElementById('carBtnText').innerText = trans.car;
      document.getElementById('languageBtnText').innerText = trans.language;
      document.getElementById('addBtnText').innerText = trans.add;
      document.getElementById('username').innerText = trans.login;
      document.getElementById('logoutBtnText').innerText = trans.logout;
      document.getElementById('mainTitle').innerText = trans.mainTitle;
      document.getElementById('propertyTypeLabel').innerText = trans.propertyTypeLabel;
      document.getElementById('propertyStatusLabel').innerText = trans.propertyStatusLabel;
      document.getElementById('propertyLocationLabel').innerText = trans.propertyLocationLabel;
      document.getElementById('propertyAreaLabel').innerText = trans.propertyAreaLabel;
      document.getElementById('propertyPriceLabel').innerText = trans.propertyPriceLabel;
      document.getElementById('searchBtnText').innerText = trans.search;
    }
  
    // თითოეული ენის არჩევის ელემენტზე event listener
    languageOptions.forEach(option => {
      option.addEventListener('click', function() {
        const selectedLang = this.getAttribute('data-lang');
        changeLanguage(selectedLang);
        languageDropdown.style.display = 'none';
      });
    });
  });