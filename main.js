import './style.scss'

document.addEventListener('DOMContentLoaded', function() {

  let dataList = [];

  async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/locations");
    const json = await response.json();
    json.forEach(data => dataList.push(data));

    console.log(dataList); 

    const provinceSelect = document.getElementById('provinceSelect');
        const amphoeSelect = document.getElementById('amphoeSelect');
        const districtSelect = document.getElementById('districtSelect');
        const zipcodeInput = document.getElementById('zipcodeInput');

  // Function to populate select options without duplicates
  function populateSelect(selectElement, dataArray, key) {
      const uniqueValues = new Set(dataArray.map(item => item[key]));
      selectElement.innerHTML = '<option value="">Select ' + key.charAt(0).toUpperCase() + key.slice(1) + '</option>';
      uniqueValues.forEach(value => {
          const option = document.createElement('option');
          option.text = value;
          option.value = value;
          selectElement.add(option);
      });
  }

  // Populate Province Select
  populateSelect(provinceSelect, dataList, 'province');

  // Province Select change event
  provinceSelect.addEventListener('change', function() {
      amphoeSelect.innerHTML = '<option value="">Select Amphoe</option>';
      districtSelect.innerHTML = '<option value="">Select District</option>';
      zipcodeInput.value = '';
      amphoeSelect.disabled = false;

      const selectedProvince = this.value;
      const filteredAmphoes = dataList.filter(location => location.province === selectedProvince);
      populateSelect(amphoeSelect, filteredAmphoes, 'amphoe');
  });

  // Amphoe Select change event
  amphoeSelect.addEventListener('change', function() {
      districtSelect.innerHTML = '<option value="">Select District</option>';
      zipcodeInput.value = '';
      districtSelect.disabled = false;

      const selectedAmphoe = this.value;
      const filteredDistricts = dataList.filter(location => location.amphoe === selectedAmphoe);
      populateSelect(districtSelect, filteredDistricts, 'district');
  });

  // District Select change event
  districtSelect.addEventListener('change', function() {
      const selectedDistrict = this.value;
      const selectedLocation = dataList.find(location => location.district === selectedDistrict);
      zipcodeInput.value = selectedLocation ? selectedLocation.zipcode : '';
  });


  } catch (error) {
      console.error("Error fetching data:", error);
  }
  }

  fetchData();
  
});