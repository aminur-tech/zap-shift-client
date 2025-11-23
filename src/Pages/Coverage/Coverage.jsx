import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const servicesArea = useLoaderData();
  const mapRef = useRef(null);

  // -------- FIX: Access Leaflet Map Properly --------
  function SetMapRef() {
    const map = useMap();
    mapRef.current = map;
    return null;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.location.value.toLowerCase();

    const found = servicesArea.find((d) =>
      d.district.toLowerCase().includes(text)
    );

    if (found) {
      mapRef.current.flyTo([found.latitude, found.longitude], 14, {
        duration: 1.5,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10 px-4">
      <title>Coverage</title>

      <div className="max-w-6xl mx-auto space-y-8">

        {/* BEAUTIFUL HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            We Are Available in <span className="text-primary">64 Districts</span>
          </h1>
          <p className="text-gray-600">Search your district to check coverage</p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="flex justify-center">
          <label className="input input-bordered flex items-center gap-2 w-full max-w-xl rounded-xl bg-white/90">
            <input
              type="search"
              name="location"
              placeholder="Search a district..."
              className="grow"
            />
          </label>
          <button className="btn btn-primary rounded-xl ml-3 px-6">
            Search
          </button>
        </form>

        {/* MAP */}
        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={true}
            className="w-full h-[700px]"
          >
            {/* FIX: inject map instance */}
            <SetMapRef />

            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MARKERS */}
            {servicesArea.map((service, i) => (
              <Marker
                key={i}
                position={[service.latitude, service.longitude]}
              >
                <Popup>
                  <h2 className="font-bold text-primary">
                    {service.city}, {service.district}
                  </h2>
                  <p><strong>Region:</strong> {service.region}</p>
                  <p>
                    <strong>Covered:</strong> {service.covered_area.join(", ")}
                  </p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
