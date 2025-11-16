// SAMPLE TORQUE DATABASE (add more later)
const torqueData = [
  {
    year: 2005,
    make: "Honda",
    model: "Accord",
    trim: "LX",
    system: "Wheels",
    component: "Front Lug Nuts",
    torque: "80 ft-lbs (108 Nm)"
  },
  {
    year: 2014,
    make: "Toyota",
    model: "RAV4",
    trim: "LE",
    system: "Wheels",
    component: "Wheel Lug Nuts",
    torque: "76 ft-lbs (103 Nm)"
  }
];

// Extract unique makes
const makes = [...new Set(torqueData.map(x => x.make))].sort();

// Build Left Menu
const makeList = document.getElementById("makeList");

makes.forEach(make => {
  let li = document.createElement("li");
  li.className = "make-item";
  li.innerHTML = `<span class='toggle'>+</span>${make}`;
  li.onclick = () => toggleMake(make, li);
  makeList.appendChild(li);
});

function toggleMake(make, element) {
  if (element.dataset.open) {
    element.dataset.open = "";
    removeSubItems(element);
    element.querySelector(".toggle").textContent = "+";
    return;
  }

  element.dataset.open = "true";
  element.querySelector(".toggle").textContent = "-";

  const years = [...new Set(torqueData.filter(x=>x.make===make).map(x=>x.year))]
                .sort((a,b)=>b-a);

  years.forEach(year => {
    insertSubItem(element, year, "year", () => toggleYear(make, year, element));
  });
}

function toggleYear(make, year, parentEl) {
  removeSubItems(parentEl);

  const models = [...new Set(
    torqueData.filter(x=>x.make===make && x.year===year).map(x=>x.model)
  )];

  models.forEach(model => {
    insertSubItem(parentEl, model, "model", () => toggleModel(make, year, model, parentEl));
  });
}

function toggleModel(make, year, model, parentEl) {
  removeSubItems(parentEl);

  const trims = [...new Set(
    torqueData.filter(x=>x.make===make && x.year===year && x.model===model).map(x=>x.trim)
  )];

  trims.forEach(trim => {
    insertSubItem(parentEl, trim, "trim", () => toggleTrim(make, year, model, trim, parentEl));
  });
}

function toggleTrim(make, year, model, trim, parentEl) {
  removeSubItems(parentEl);

  const components = torqueData
    .filter(x => x.make===make && x.year===year && x.model===model && x.trim===trim)
    .map(x => x.component);

  components.forEach(component => {
    insertSubItem(parentEl, component, "component",
      () => showTorque(make, year, model, trim, component)
    );
  });
}

function showTorque(make, year, model, trim, component) {
  const result = torqueData.find(x =>
    x.make===make &&
    x.year===year &&
    x.model===model &&
    x.trim===trim &&
    x.component===component
  );

  document.getElementById("content").innerHTML = `
    <h2>${year} ${make} ${model} (${trim})</h2>
    <h3>${component}</h3>
    <p><strong>Torque:</strong> ${result.torque}</p>
  `;
}

function insertSubItem(parent, label, type, onClick) {
  let sub = document.createElement("div");
  sub.className = "sub-item";
  sub.style.marginLeft = "28px";
  sub.textContent = label;
  sub.onclick = (e) => {
    e.stopPropagation();
    onClick();
  };
  parent.after(sub);
}

function removeSubItems(parent) {
  let next = parent.nextElementSibling;
  while (next && next.classList.contains("sub-item")) {
    let temp = next.nextElementSibling;
    next.remove();
    next = temp;
  }
}