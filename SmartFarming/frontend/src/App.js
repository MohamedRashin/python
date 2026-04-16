import {
  AlertCircle, CloudRain, Droplets, Leaf, MapPin, Search, Target,
  Thermometer, Navigation, Sparkles, BarChart3, Droplet, Sprout,
  Sun, Wind, ChevronRight, Award, TrendingUp, Calendar, Info,
  RefreshCw, Sliders, Edit3, Activity, TrendingDown, Shield,
  DollarSign, Users, Globe, Clock, CheckCircle, PieChart,
  LineChart, Download, Filter, Eye, Zap, Cloud, Moon,
  ToggleLeft, ToggleRight, Bell, Settings, HelpCircle,
  MessageSquare, Star, Share2, BookOpen, Database, Cpu,
  Layers, X
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  LineChart as ReLineChart, Line,
  BarChart as ReBarChart, Bar,
  PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// ─── Crop Growth Stages ──────────────────────────────────────────────────────
const cropStages = {
  rice: [
    { name: "Seedling 🌱", tip: "Maintain water level in field" },
    { name: "Vegetative 🌿", tip: "Apply nitrogen fertilizer" },
    { name: "Flowering 🌸", tip: "Avoid water stress" },
    { name: "Harvest 🌾", tip: "Drain water before harvest" }
  ],
  maize: [
    { name: "Seedling 🌱", tip: "Ensure proper spacing" },
    { name: "Vegetative 🌿", tip: "Apply NPK fertilizer" },
    { name: "Flowering 🌸", tip: "Critical irrigation stage" },
    { name: "Harvest 🌾", tip: "Harvest when cobs dry" }
  ],
  cotton: [
    { name: "Seedling 🌱", tip: "Protect from pests early" },
    { name: "Vegetative 🌿", tip: "Weed control important" },
    { name: "Flowering 🌸", tip: "Monitor bollworms" },
    { name: "Harvest 🌾", tip: "Pick when bolls open" }
  ],
  wheat: [
    { name: "Seedling 🌱", tip: "Ensure good seed-soil contact" },
    { name: "Vegetative 🌿", tip: "Apply urea topdressing" },
    { name: "Flowering 🌸", tip: "Protect from rust disease" },
    { name: "Harvest 🌾", tip: "Harvest at golden stage" }
  ],
  sugarcane: [
    { name: "Seedling 🌱", tip: "Plant setts at 75cm spacing" },
    { name: "Vegetative 🌿", tip: "Earthing up and fertilization" },
    { name: "Flowering 🌸", tip: "Detopping increases sugar yield" },
    { name: "Harvest 🌾", tip: "Harvest at 10–12 months" }
  ],
  soybean: [
    { name: "Seedling 🌱", tip: "Inoculate seed with Rhizobium" },
    { name: "Vegetative 🌿", tip: "Maintain weed-free conditions" },
    { name: "Flowering 🌸", tip: "Adequate moisture is critical" },
    { name: "Harvest 🌾", tip: "Harvest when pods rattle" }
  ],
  banana: [
    { name: "Seedling 🌱", tip: "Use disease-free suckers" },
    { name: "Vegetative 🌿", tip: "Apply potash regularly" },
    { name: "Flowering 🌸", tip: "Remove male bud after last hand" },
    { name: "Harvest 🌾", tip: "Harvest when fingers fill out" }
  ],
  mango: [
    { name: "Seedling 🌱", tip: "Plant in well-drained soil" },
    { name: "Vegetative 🌿", tip: "Prune to shape canopy" },
    { name: "Flowering 🌸", tip: "Avoid water stress at flowering" },
    { name: "Harvest 🌾", tip: "Harvest when shoulders fill" }
  ],
  default: [
    { name: "Seedling 🌱", tip: "Prepare soil and plant carefully" },
    { name: "Vegetative 🌿", tip: "Fertilize and irrigate regularly" },
    { name: "Flowering 🌸", tip: "Monitor pests and diseases" },
    { name: "Harvest 🌾", tip: "Harvest at the right maturity" }
  ]
};

// ─── Growth Stages Component ─────────────────────────────────────────────────
const GrowthStagesPanel = ({ cropName }) => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = cropStages[cropName] || cropStages.default;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
        <Leaf className="w-4 h-4 mr-2 text-green-600" />
        {cropName?.toUpperCase()} Growth Stages
      </h3>

      {/* Stage selector tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {stages.map((stage, index) => (
          <button
            key={index}
            onClick={() => setActiveStage(index)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeStage === index
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300"
            }`}
          >
            {stage.name}
          </button>
        ))}
      </div>

      {/* Active stage detail */}
      <div className="bg-white rounded-xl p-4 border border-emerald-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
            {activeStage === 0 ? "🌱" : activeStage === 1 ? "🌿" : activeStage === 2 ? "🌸" : "🌾"}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{stages[activeStage].name}</p>
            <p className="text-xs text-emerald-700 mt-1 font-medium">💡 {stages[activeStage].tip}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Growth progress</span>
            <span>Stage {activeStage + 1} of {stages.length}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* All stages mini grid */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        {stages.map((stage, index) => (
          <div
            key={index}
            onClick={() => setActiveStage(index)}
            className={`bg-white p-2 rounded-lg text-center cursor-pointer border transition-all ${
              activeStage === index ? "border-emerald-400 shadow-sm" : "border-gray-100 hover:border-emerald-200"
            }`}
          >
            <p className="text-sm font-medium text-gray-800">{stage.name}</p>
            <p className="text-xs text-gray-500 mt-1">{stage.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Image Recommendation Module ─────────────────────────────────────────────
const ImageRecommendationModule = ({ predictions, soilInfo, weatherData, locationInfo, manualInputs }) => {
  const [activeImageTab, setActiveImageTab] = useState("crop");
  const [selectedCrop, setSelectedCrop] = useState(null);

  const imageDatabase = {
    crops: {
      rice: {
        main: "https://images.unsplash.com/photo-1600387845879-a4713f764110?w=800&auto=format&fit=crop&q=80",
        growing: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=80",
        harvest: "https://images.unsplash.com/photo-1590736961566-5e8c33a6a4c7?w=800&auto=format&fit=crop&q=80",
        tips: "https://images.unsplash.com/photo-1585195833473-7e5f5d8c8f6c?w=800&auto=format&fit=crop&q=80"
      },
      wheat: {
        main: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
        growing: "https://images.unsplash.com/photo-1613491071987-3f8d3cf9a7e6?w=800&auto=format&fit=crop&q=80",
        harvest: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
        tips: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80"
      },
      maize: {
        main: "https://images.unsplash.com/photo-1649251037566-6881b4956615?w=800&auto=format&fit=crop&q=80",
        growing: "https://images.unsplash.com/photo-1628191012186-ee9f42f0d342?w=800&auto=format&fit=crop&q=80",
        harvest: "https://images.unsplash.com/photo-1511629091441-35a56e5967d9?w=800&auto=format&fit=crop&q=80",
        tips: "https://images.unsplash.com/photo-1628191012186-ee9f42f0d342?w=800&auto=format&fit=crop&q=80"
      },
      cotton: {
        main: "https://images.unsplash.com/photo-1590831066162-2f3f1fbe7f1c?w=800&auto=format&fit=crop&q=80",
        growing: "https://images.unsplash.com/photo-1590831066162-2f3f1fbe7f1c?w=800&auto=format&fit=crop&q=80",
        harvest: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80",
        tips: "https://images.unsplash.com/photo-1590831066162-2f3f1fbe7f1c?w=800&auto=format&fit=crop&q=80"
      },
      sugarcane: {
        main: "https://images.unsplash.com/photo-1598954515732-98b7f07e191a?w=800&auto=format&fit=crop&q=80",
        growing: "https://images.unsplash.com/photo-1598954515732-98b7f07e191a?w=800&auto=format&fit=crop&q=80",
        harvest: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80",
        tips: "https://images.unsplash.com/photo-1598954515732-98b7f07e191a?w=800&auto=format&fit=crop&q=80"
      },
      soybean: {
        main: "https://images.unsplash.com/photo-1608919865378-c3eaefafb7a2?w=800&auto=format&fit=crop&q=80",
        growing: "https://images.unsplash.com/photo-1608919865378-c3eaefafb7a2?w=800&auto=format&fit=crop&q=80",
        harvest: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
        tips: "https://images.unsplash.com/photo-1608919865378-c3eaefafb7a2?w=800&auto=format&fit=crop&q=80"
      },
      banana: {
        main: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaCot4BZWKtLWdG0QJmnPm8z5LqtbqShUeufhHf7UHO4Vn5UNiqi5gbnjUE-a5-l4qaCPfxarZ8QgYSqHDTFkDQkfxlBTj1kAvveKuK1o",
        growing: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaCot4BZWKtLWdG0QJmnPm8z5LqtbqShUeufhHf7UHO4Vn5UNiqi5gbnjUE-a5-l4qaCPfxarZ8QgYSqHDTFkDQkfxlBTj1kAvveKuK1o",
        harvest: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaCot4BZWKtLWdG0QJmnPm8z5LqtbqShUeufhHf7UHO4Vn5UNiqi5gbnjUE-a5-l4qaCPfxarZ8QgYSqHDTFkDQkfxlBTj1kAvveKuK1o",
        tips: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaCot4BZWKtLWdG0QJmnPm8z5LqtbqShUeufhHf7UHO4Vn5UNiqi5gbnjUE-a5-l4qaCPfxarZ8QgYSqHDTFkDQkfxlBTj1kAvveKuK1o"
      },
      mango: {
        main: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gwEx3zDNwXP_S4IjGhs24liH0Gc0IcUqSQ&s",
        growing: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gwEx3zDNwXP_S4IjGhs24liH0Gc0IcUqSQ&s",
        harvest: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gwEx3zDNwXP_S4IjGhs24liH0Gc0IcUqSQ&s",
        tips: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gwEx3zDNwXP_S4IjGhs24liH0Gc0IcUqSQ&s"
      }
    },
    soil: {
      fertile: {
        main: "https://media.istockphoto.com/id/1674128921/photo/fertile-soil-background.jpg?s=1024x1024&w=is&k=20&c=yjcbBYq41lSDGDq895NyD60Yhd28V9LOTnXVix6kh3U=",
        structure: "https://5.imimg.com/data5/SELLER/Default/2023/8/334629784/CN/IL/TY/1705824/black-soil-500x500.jpg",
        management: "https://media.istockphoto.com/id/1213894990/photo/soil-test-indoors.jpg?s=1024x1024&w=is&k=20&c=tP1FgZqJt0fMlR1aQkJYZfG93K3dX9G-gdPJwQt2nWk="
      },
      acidic: {
        main: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Soil_Auroville.JPG",
        structure: "https://5.imimg.com/data5/SELLER/Default/2022/1/NF/QZ/SY/110557789/red-soil-500x500.jpg",
        management: "https://media.istockphoto.com/id/1213894990/photo/soil-test-indoors.jpg?s=1024x1024&w=is&k=20&c=tP1FgZqJt0fMlR1aQkJYZfG93K3dX9G-gdPJwQt2nWk="
      },
      alkaline: {
        main: "https://www.richgro.com.au/app/uploads/2023/05/alkaline-1024x682.jpg",
        structure: "https://5.imimg.com/data5/SELLER/Default/2022/1/NF/QZ/SY/110557789/red-soil-500x500.jpg",
        management: "https://media.istockphoto.com/id/1213894990/photo/soil-test-indoors.jpg?s=1024x1024&w=is&k=20&c=tP1FgZqJt0fMlR1aQkJYZfG93K3dX9G-gdPJwQt2nWk="
      },
      nitrogen_deficient: {
        main: "https://images.pexels.com/photos/216692/pexels-photo-216692.jpeg",
        structure: "https://5.imimg.com/data5/SELLER/Default/2022/1/NF/QZ/SY/110557789/red-soil-500x500.jpg",
        management: "https://media.istockphoto.com/id/1213894990/photo/soil-test-indoors.jpg?s=1024x1024&w=is&k=20&c=tP1FgZqJt0fMlR1aQkJYZfG93K3dX9G-gdPJwQt2nWk="
      }
    },
    practices: {
      irrigation: {
        drip: "https://images.unsplash.com/photo-1626806787462-102c1a746a1d?w=800&auto=format&fit=crop&q=80",
        sprinkler: "https://images.unsplash.com/photo-1531721803625-2b219faf7a4c?w=800&auto=format&fit=crop&q=80",
        flood: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80"
      },
      fertilization: {
        organic: "https://images.unsplash.com/photo-1531721803625-2b219faf7a4c?w=800&auto=format&fit=crop&q=80",
        chemical: "https://images.unsplash.com/photo-1626806787462-102c1a746a1d?w=800&auto=format&fit=crop&q=80",
        composting: "https://images.unsplash.com/photo-1531721803625-2b219faf7a4c?w=800&auto=format&fit=crop&q=80"
      },
      pest_control: {
        natural: "https://images.unsplash.com/photo-1626806787462-102c1a746a1d?w=800&auto=format&fit=crop&q=80",
        integrated: "https://images.unsplash.com/photo-1531721803625-2b219faf7a4c?w=800&auto=format&fit=crop&q=80"
      }
    },
    weather: {
      sunny: "https://images.unsplash.com/photo-1601297183307-3df142d3c25f?w=800&auto=format&fit=crop&q=80",
      rainy: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&auto=format&fit=crop&q=80",
      cloudy: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop&q=80"
    }
  };

  const getSoilTypeKey = () => {
    if (soilInfo.type.includes("Fertile")) return "fertile";
    if (soilInfo.type.includes("Acidic")) return "acidic";
    if (soilInfo.type.includes("Alkaline")) return "alkaline";
    if (soilInfo.type.includes("Nitrogen-Deficient")) return "nitrogen_deficient";
    return "fertile";
  };

  const getWeatherImage = () => {
    if (!weatherData) return imageDatabase.weather.sunny;
    const temp = weatherData.temperature;
    if (temp > 30) return imageDatabase.weather.sunny;
    if (weatherData.rainfall > 50) return imageDatabase.weather.rainy;
    return imageDatabase.weather.cloudy;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Visual Recommendations Gallery
        </h2>
        <p className="text-purple-100 text-sm mt-1">See what your recommendations look like in practice</p>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
          {[
            { key: "crop", icon: Sprout, label: "Crop Images" },
            { key: "stages", icon: Leaf, label: "Growth Stages" },
            { key: "soil", icon: BarChart3, label: "Soil Visuals" },
            { key: "practices", icon: Activity, label: "Farming Practices" },
            { key: "weather", icon: CloudRain, label: "Weather Guide" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveImageTab(key)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center ${
                activeImageTab === key
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {activeImageTab === "crop" && predictions && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Leaf className="w-4 h-4 mr-2 text-emerald-600" />
                  {predictions.recommended.charAt(0).toUpperCase() + predictions.recommended.slice(1)} - Main View
                </h3>
                <img
                  src={imageDatabase.crops[predictions.recommended]?.main || imageDatabase.crops.rice.main}
                  alt={predictions.recommended}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-3">
                  Mature {predictions.recommended} crop ready for harvest. This variety is well-suited for your region.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                  Growing Stage
                </h3>
                <img
                  src={imageDatabase.crops[predictions.recommended]?.growing || imageDatabase.crops.rice.growing}
                  alt={`${predictions.recommended} growing`}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-3">
                  {predictions.recommended} during active growth phase. Optimal conditions for your area.
                </p>
              </div>
            </div>
            {predictions.topCrops && predictions.topCrops.length > 1 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-amber-600" />
                  Alternative Crop Options
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {predictions.topCrops.slice(1, 5).map((crop, idx) => (
                    <div key={idx} className="cursor-pointer hover:scale-105 transition-transform" onClick={() => setSelectedCrop(crop.name)}>
                      <img
                        src={imageDatabase.crops[crop.name]?.main || imageDatabase.crops.rice.main}
                        alt={crop.name}
                        className="w-full h-32 object-cover rounded-lg shadow-md"
                      />
                      <p className="text-sm font-medium text-gray-700 mt-2 text-center capitalize">{crop.name}</p>
                      <p className="text-xs text-center text-emerald-600">{(crop.probability * 100).toFixed(0)}% suitable</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Growing Tips for {predictions.recommended}
              </h3>
              <div className="flex gap-4">
                <img
                  src={imageDatabase.crops[predictions.recommended]?.tips || imageDatabase.crops.rice.tips}
                  alt="Farming tips"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Plant during {predictions.recommended === 'rice' ? 'monsoon' : 'early spring'} season</li>
                    <li>• Maintain soil moisture levels at 60-70%</li>
                    <li>• Apply fertilizer in split doses for better yield</li>
                    <li>• Monitor for common pests weekly</li>
                    {locationInfo?.region && <li>• {locationInfo.region} specific: Follow local planting calendar</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Growth Stages Tab ── */}
        {activeImageTab === "stages" && predictions && (
          <div className="space-y-6">
            <GrowthStagesPanel cropName={predictions.recommended} />
            {predictions.topCrops && predictions.topCrops.length > 1 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2 text-emerald-600" />
                  Alternative Crops – Growth Stages
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {predictions.topCrops.slice(1, 3).map((crop, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="font-semibold text-gray-800 mb-3 capitalize">{crop.name}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {(cropStages[crop.name] || cropStages.default).map((stage, si) => (
                          <div key={si} className="bg-gray-50 p-2 rounded-lg text-center">
                            <p className="text-sm font-medium">{stage.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{stage.tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeImageTab === "soil" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-50 to-stone-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-stone-600" />
                  Your Soil Type: {soilInfo.type}
                </h3>
                <img
                  src={imageDatabase.soil[getSoilTypeKey()]?.main || imageDatabase.soil.fertile.main}
                  alt={soilInfo.type}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-3">{soilInfo.description}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-blue-600" />
                  Soil Structure & Management
                </h3>
                <img
                  src={imageDatabase.soil[getSoilTypeKey()]?.structure || imageDatabase.soil.fertile.structure}
                  alt="Soil structure"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-3">{soilInfo.recommendation}</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Soil Amendment Recommendations
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-green-700">Current NPK: {manualInputs?.N}-{manualInputs?.P}-{manualInputs?.K}</p>
                  <p className="text-xs text-gray-600 mt-1">Target: 120-60-80 for optimal growth</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-green-700">Organic Matter</p>
                  <p className="text-xs text-gray-600 mt-1">Add compost or green manure</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-green-700">pH Management</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {manualInputs?.ph < 6.5 ? "Add lime to raise pH" : manualInputs?.ph > 7.5 ? "Add sulfur to lower pH" : "pH is optimal"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeImageTab === "practices" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Droplet className="w-4 h-4 mr-2 text-blue-600" />
                  Irrigation Method
                </h3>
                <img src="https://plus.unsplash.com/premium_photo-1661845609789-635c5e35c4ba?q=80&w=948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Irrigation" className="w-full h-48 object-cover rounded-xl shadow-lg" />
                <p className="text-sm text-gray-600 mt-3 font-medium">
                  Recommended: {weatherData?.rainfall > 100 ? "Flood Irrigation" : weatherData?.rainfall > 50 ? "Sprinkler System" : "Drip Irrigation"}
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-amber-600" />
                  Pest Management
                </h3>
                <img src="https://www.protectedcultivation.com/uploads/blogs/82.jpg" alt="Pest control" className="w-full h-48 object-cover rounded-xl shadow-lg" />
                <p className="text-sm text-gray-600 mt-3 font-medium">Integrated Pest Management (IPM)</p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Sustainable Farming Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {["Crop rotation every season", "Soil testing every 3 months", "Mulching to retain moisture", "Companion planting for pest control"].map(item => (
                  <div key={item} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeImageTab === "weather" && weatherData && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Sun className="w-4 h-4 mr-2 text-yellow-600" />
                  Current Weather Conditions
                </h3>
                <img src={getWeatherImage()} alt="Weather" className="w-full h-64 object-cover rounded-xl shadow-lg" />
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.temperature.toFixed(1)}°C</p>
                    <p className="text-xs text-gray-500">Temperature</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.humidity.toFixed(0)}%</p>
                    <p className="text-xs text-gray-500">Humidity</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.rainfall.toFixed(1)}mm</p>
                    <p className="text-xs text-gray-500">Rainfall</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Seasonal Guide
                </h3>
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80"
                  alt="Seasonal farming"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <ul className="text-xs text-gray-600 mt-3 space-y-1">
                  <li>• {weatherData.temperature > 30 ? "Provide shade for young plants" : "Optimal growing conditions"}</li>
                  <li>• {weatherData.rainfall > 100 ? "Ensure proper drainage systems" : "Schedule irrigation appropriately"}</li>
                  <li>• {weatherData.humidity > 80 ? "Monitor for fungal diseases" : "Good conditions for pollination"}</li>
                </ul>
              </div>
            </div>
            {(weatherData.temperature > 35 || weatherData.rainfall > 150 || weatherData.humidity > 85) && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800">Weather Alert</h3>
                    <p className="text-sm text-red-700">
                      {weatherData.temperature > 35 && "⚠️ Extreme heat detected - increase irrigation frequency. "}
                      {weatherData.rainfall > 150 && "⚠️ Heavy rainfall warning - check drainage systems. "}
                      {weatherData.humidity > 85 && "⚠️ High humidity - risk of fungal diseases"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => alert("Report generation feature coming soon!")}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Visual Guide
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main App ────────────────────────────────────────────────────────────────
const CropRecommendationApp = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [address, setAddress] = useState("");
  const [manualInputs, setManualInputs] = useState({ N: 95, P: 74, K: 50, ph: 6.0 });
  const [originalSoilParams, setOriginalSoilParams] = useState({ N: 95, P: 74, K: 50, ph: 6.0 });
  const [manualWeatherInputs, setManualWeatherInputs] = useState({ temperature: 25.0, humidity: 70.0, rainfall: 150.0 });
  const [weatherData, setWeatherData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState("location");
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("recommendation");
  const [inputType, setInputType] = useState("slider");
  const [timeRange, setTimeRange] = useState("week");
  const [notifications, setNotifications] = useState([]);
  const [autoAdjustSoil, setAutoAdjustSoil] = useState(true);
  const [weatherAdjustments, setWeatherAdjustments] = useState([]);
  const [locationInfo, setLocationInfo] = useState({ region: null, climate: null, suitableCrops: [], commonCrops: [] });

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [focusedSuggestionIdx, setFocusedSuggestionIdx] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchDebounceRef = useRef(null);
  const searchContainerRef = useRef(null);

  const [historicalData, setHistoricalData] = useState([]);
  const [cropPerformance, setCropPerformance] = useState([]);
  const [soilTrends, setSoilTrends] = useState([]);
  const [userStats] = useState({
    totalPredictions: 245,
    averageConfidence: 87.5,
    topCrops: ['Rice', 'Maize', 'Wheat'],
    soilHealthScore: 78
  });

  const cropSuitabilityDatabase = {
    tropical: {
      rice: { minTemp: 20, maxTemp: 35, minRainfall: 100, maxRainfall: 300, soilN: 60, soilP: 40, soilK: 40, phRange: [5.5, 7.0] },
      banana: { minTemp: 25, maxTemp: 35, minRainfall: 100, maxRainfall: 250, soilN: 80, soilP: 50, soilK: 60, phRange: [5.5, 7.0] },
      coconut: { minTemp: 25, maxTemp: 32, minRainfall: 100, maxRainfall: 250, soilN: 50, soilP: 40, soilK: 60, phRange: [5.5, 7.5] },
      sugarcane: { minTemp: 20, maxTemp: 35, minRainfall: 100, maxRainfall: 200, soilN: 70, soilP: 50, soilK: 60, phRange: [6.0, 7.5] },
      coffee: { minTemp: 18, maxTemp: 28, minRainfall: 150, maxRainfall: 200, soilN: 60, soilP: 40, soilK: 50, phRange: [5.5, 6.5] },
      papaya: { minTemp: 22, maxTemp: 32, minRainfall: 100, maxRainfall: 200, soilN: 70, soilP: 50, soilK: 60, phRange: [6.0, 7.0] },
      maize: { minTemp: 18, maxTemp: 30, minRainfall: 50, maxRainfall: 150, soilN: 80, soilP: 50, soilK: 50, phRange: [5.5, 7.5] },
    },
    subtropical: {
      wheat: { minTemp: 10, maxTemp: 25, minRainfall: 50, maxRainfall: 100, soilN: 70, soilP: 50, soilK: 50, phRange: [6.0, 7.5] },
      maize: { minTemp: 18, maxTemp: 30, minRainfall: 50, maxRainfall: 150, soilN: 80, soilP: 50, soilK: 50, phRange: [5.5, 7.5] },
      cotton: { minTemp: 20, maxTemp: 35, minRainfall: 50, maxRainfall: 100, soilN: 60, soilP: 50, soilK: 50, phRange: [6.0, 7.5] },
      soybean: { minTemp: 15, maxTemp: 30, minRainfall: 50, maxRainfall: 120, soilN: 70, soilP: 50, soilK: 60, phRange: [6.0, 7.0] },
      sugarcane: { minTemp: 20, maxTemp: 35, minRainfall: 100, maxRainfall: 200, soilN: 70, soilP: 50, soilK: 60, phRange: [6.0, 7.5] },
    },
    temperate: {
      apple: { minTemp: 5, maxTemp: 25, minRainfall: 50, maxRainfall: 100, soilN: 60, soilP: 50, soilK: 60, phRange: [6.0, 7.0] },
      wheat: { minTemp: 10, maxTemp: 25, minRainfall: 50, maxRainfall: 100, soilN: 70, soilP: 50, soilK: 50, phRange: [6.0, 7.5] },
      barley: { minTemp: 8, maxTemp: 25, minRainfall: 40, maxRainfall: 80, soilN: 60, soilP: 40, soilK: 50, phRange: [6.0, 7.5] },
      oats: { minTemp: 5, maxTemp: 25, minRainfall: 50, maxRainfall: 100, soilN: 60, soilP: 40, soilK: 50, phRange: [5.5, 7.0] },
      potato: { minTemp: 10, maxTemp: 25, minRainfall: 50, maxRainfall: 100, soilN: 80, soilP: 60, soilK: 70, phRange: [5.5, 6.5] },
    },
    arid: {
      millet: { minTemp: 25, maxTemp: 40, minRainfall: 20, maxRainfall: 80, soilN: 50, soilP: 40, soilK: 40, phRange: [6.0, 8.0] },
      sorghum: { minTemp: 20, maxTemp: 35, minRainfall: 30, maxRainfall: 100, soilN: 60, soilP: 40, soilK: 50, phRange: [6.0, 7.5] },
      cotton: { minTemp: 20, maxTemp: 35, minRainfall: 50, maxRainfall: 100, soilN: 60, soilP: 50, soilK: 50, phRange: [6.0, 7.5] },
      groundnut: { minTemp: 20, maxTemp: 35, minRainfall: 40, maxRainfall: 100, soilN: 50, soilP: 40, soilK: 50, phRange: [6.0, 7.0] },
    }
  };

  const regionCropMap = {
    'punjab': ['wheat', 'rice', 'maize', 'cotton'],
    'haryana': ['wheat', 'rice', 'maize', 'sugarcane'],
    'uttar pradesh': ['wheat', 'rice', 'sugarcane', 'maize', 'potato'],
    'tamil nadu': ['rice', 'sugarcane', 'cotton', 'groundnut', 'coconut'],
    'karnataka': ['rice', 'ragi', 'sugarcane', 'coffee', 'cotton'],
    'kerala': ['rice', 'coconut', 'rubber', 'coffee', 'banana'],
    'maharashtra': ['cotton', 'sugarcane', 'soybean', 'groundnut', 'millet'],
    'gujarat': ['cotton', 'groundnut', 'wheat', 'rice', 'sugarcane'],
    'rajasthan': ['millet', 'wheat', 'mustard', 'groundnut', 'cotton'],
    'default': ['rice', 'wheat', 'maize', 'millet', 'pulses']
  };

  const cropImages = {
    rice: "https://images.unsplash.com/photo-1600387845879-a4713f764110?w=700&auto=format&fit=crop&q=60",
    maize: "https://images.unsplash.com/photo-1649251037566-6881b4956615?w=700&auto=format&fit=crop&q=60",
    wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop&q=60",
    banana: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaCot4BZWKtLWdG0QJmnPm8z5LqtbqShUeufhHf7UHO4Vn5UNiqi5gbnjUE-a5-l4qaCPfxarZ8QgYSqHDTFkDQkfxlBTj1kAvveKuK1o",
    mango: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gwEx3zDNwXP_S4IjGhs24liH0Gc0IcUqSQ&s",
    cotton: "https://images.unsplash.com/photo-1590831066162-2f3f1fbe7f1c?w=700&auto=format&fit=crop&q=60",
    sugarcane: "https://images.unsplash.com/photo-1598954515732-98b7f07e191a?w=700&auto=format&fit=crop&q=60",
    soybean: "https://images.unsplash.com/photo-1608919865378-c3eaefafb7a2?w=700&auto=format&fit=crop&q=60"
  };

  useEffect(() => {
    const handler = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowDropdown(false);
        setFocusedSuggestionIdx(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) { setSuggestions([]); setShowDropdown(false); return; }
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => { searchLocation(searchQuery); }, 350);
    return () => clearTimeout(searchDebounceRef.current);
  }, [searchQuery]);

  const searchLocation = async (query) => {
    setIsSearching(true);
    try {
      const apiKey = "9634574db1da4be795f9c715feea20af";
      const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=6&pretty=1&countrycode=in&language=en`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const list = data.results.map(r => ({ formatted: r.formatted, lat: r.geometry.lat, lng: r.geometry.lng, components: r.components, confidence: r.confidence }));
        setSuggestions(list); setShowDropdown(true); setFocusedSuggestionIdx(-1);
      } else { setSuggestions([]); setShowDropdown(true); }
    } catch (err) { setSuggestions([]); } finally { setIsSearching(false); }
  };

  const handleSelectSuggestion = async (suggestion) => {
    setLocation({ lat: suggestion.lat, lon: suggestion.lng });
    setAddress(suggestion.formatted);
    setSearchQuery(suggestion.formatted);
    setSuggestions([]); setShowDropdown(false); setFocusedSuggestionIdx(-1);
    if (autoAdjustSoil) await getWeatherAndRegionAndAdjust(suggestion.lat, suggestion.lng);
    addNotification(`Location set to: ${suggestion.formatted}`, "success");
  };

  const handleSearchKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setFocusedSuggestionIdx(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setFocusedSuggestionIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { if (focusedSuggestionIdx >= 0 && suggestions[focusedSuggestionIdx]) handleSelectSuggestion(suggestions[focusedSuggestionIdx]); }
    else if (e.key === "Escape") { setShowDropdown(false); setFocusedSuggestionIdx(-1); }
  };

  const clearSearch = () => { setSearchQuery(""); setSuggestions([]); setShowDropdown(false); setFocusedSuggestionIdx(-1); };

  const getSuggestionLabel = (s) => { const c = s.components; return c?.village || c?.hamlet || c?.suburb || c?.city || c?.town || "Location"; };
  const getSuggestionType = (s) => { const c = s.components; if (c?.village || c?.hamlet) return "Village"; if (c?.suburb) return "Suburb"; if (c?.city) return "City"; if (c?.town) return "Town"; return "Place"; };

  const determineRegionFromLocation = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=9634574db1da4be795f9c715feea20af&language=en&pretty=1`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const components = data.results[0].components;
        const state = components.state?.toLowerCase() || '';
        let matchedRegion = null;
        for (const [region] of Object.entries(regionCropMap)) { if (state.includes(region)) { matchedRegion = region; break; } }
        let climate = 'subtropical';
        if (lat < 15) climate = 'tropical';
        else if (lat > 30) climate = 'temperate';
        const suitableCrops = matchedRegion ? regionCropMap[matchedRegion] : regionCropMap.default;
        setLocationInfo({ region: matchedRegion || 'general', climate, suitableCrops, commonCrops: suitableCrops.slice(0, 5) });
        return { region: matchedRegion, climate, suitableCrops };
      }
    } catch (error) { console.error("Error determining region:", error); }
    return { region: null, climate: 'subtropical', suitableCrops: regionCropMap.default };
  };

  const getLocationBasedRecommendations = (weather, soil, locationRegion) => {
    const temp = weather?.temperature || manualWeatherInputs.temperature;
    const rainfall = weather?.rainfall || manualWeatherInputs.rainfall;
    let candidateCrops = [];
    if (locationRegion?.climate && cropSuitabilityDatabase[locationRegion.climate]) {
      candidateCrops = Object.keys(cropSuitabilityDatabase[locationRegion.climate]);
    } else {
      candidateCrops = Object.keys(cropSuitabilityDatabase).flatMap(c => Object.keys(cropSuitabilityDatabase[c]));
    }
    if (locationRegion?.suitableCrops && locationRegion.suitableCrops.length > 0) {
      candidateCrops = candidateCrops.filter(c => locationRegion.suitableCrops.includes(c));
    }
    const scoredCrops = candidateCrops.map(crop => {
      let score = 0, cropData = null;
      for (const climate of Object.keys(cropSuitabilityDatabase)) {
        if (cropSuitabilityDatabase[climate][crop]) { cropData = cropSuitabilityDatabase[climate][crop]; break; }
      }
      if (!cropData) return { name: crop, probability: 0, score: 0 };
      if (temp >= cropData.minTemp && temp <= cropData.maxTemp) score += 30;
      else if (temp < cropData.minTemp) score += Math.max(0, 30 * (temp / cropData.minTemp));
      else score += Math.max(0, 30 * (1 - (temp - cropData.maxTemp) / 10));
      if (rainfall >= cropData.minRainfall && rainfall <= cropData.maxRainfall) score += 25;
      else if (rainfall < cropData.minRainfall) score += Math.max(0, 25 * (rainfall / cropData.minRainfall));
      else score += Math.max(0, 25 * (1 - (rainfall - cropData.maxRainfall) / 100));
      const nutrientScore = (Math.min(100, (soil.N / cropData.soilN) * 100) + Math.min(100, (soil.P / cropData.soilP) * 100) + Math.min(100, (soil.K / cropData.soilK) * 100)) / 3;
      score += 25 * (nutrientScore / 100);
      if (soil.ph >= cropData.phRange[0] && soil.ph <= cropData.phRange[1]) score += 20;
      else { const dist = Math.min(Math.abs(soil.ph - cropData.phRange[0]), Math.abs(soil.ph - cropData.phRange[1])); score += Math.max(0, 20 * (1 - dist / 3)); }
      return { name: crop, probability: Math.min(0.95, Math.max(0.1, score / 100)), score };
    });
    scoredCrops.sort((a, b) => b.probability - a.probability);
    return { recommended: scoredCrops[0]?.name || 'rice', confidence: scoredCrops[0]?.probability || 0.7, topCrops: scoredCrops.slice(0, 5) };
  };

  const fetchWeatherData = async (lat, lon) => {
    const month = new Date().getMonth();
    const isSummer = month >= 2 && month <= 5;
    const isMonsoon = month >= 6 && month <= 8;
    let baseTemp = 25, baseRainfall = 100, baseHumidity = 70;
    if (isSummer) { baseTemp = 32 + Math.random() * 8; baseRainfall = 30 + Math.random() * 50; baseHumidity = 40 + Math.random() * 30; }
    else if (isMonsoon) { baseTemp = 28 + Math.random() * 5; baseRainfall = 150 + Math.random() * 100; baseHumidity = 80 + Math.random() * 15; }
    else { baseTemp = 15 + Math.random() * 10; baseRainfall = 20 + Math.random() * 40; baseHumidity = 60 + Math.random() * 25; }
    const latAdjust = Math.abs(lat) > 25 ? -5 : 0;
    return {
      temperature: baseTemp + latAdjust + (Math.random() * 4 - 2),
      humidity: baseHumidity + (Math.random() * 10 - 5),
      rainfall: Math.max(0, baseRainfall + (Math.random() * 30 - 15)),
      condition: isMonsoon ? 'Rainy' : (isSummer ? 'Sunny' : 'Partly Cloudy')
    };
  };

  const adjustSoilParametersBasedOnWeather = (weather, originalParams = null) => {
    if (!autoAdjustSoil || !weather) return;
    const baseParams = originalParams || originalSoilParams;
    let adjustedN = baseParams.N, adjustedP = baseParams.P, adjustedK = baseParams.K;
    let adjustments = [];
    if (weather.temperature > 35) {
      const reduction = Math.min(30, Math.floor((weather.temperature - 35) * 2));
      adjustedN = Math.max(30, adjustedN - reduction); adjustedP = Math.max(25, adjustedP - Math.floor(reduction * 0.7)); adjustedK = Math.max(35, adjustedK - Math.floor(reduction * 0.8));
      adjustments.push(`🌡️ High temperature (${weather.temperature.toFixed(1)}°C): Nutrients reduced`);
    } else if (weather.temperature < 15) {
      const increase = Math.min(30, Math.floor((15 - weather.temperature) * 1.5));
      adjustedN = Math.min(150, adjustedN + increase); adjustedP = Math.min(100, adjustedP + Math.floor(increase * 0.7)); adjustedK = Math.min(200, adjustedK + Math.floor(increase * 0.8));
      adjustments.push(`❄️ Low temperature: Nutrients increased`);
    }
    if (weather.rainfall > 100) {
      const leaching = Math.min(40, Math.floor((weather.rainfall - 100) / 2));
      adjustedN = Math.max(25, adjustedN - leaching); adjustedP = Math.max(20, adjustedP - Math.floor(leaching * 0.6)); adjustedK = Math.max(30, adjustedK - Math.floor(leaching * 0.7));
      adjustments.push(`💧 Heavy rainfall: Nutrient leaching accounted for`);
    }
    setManualInputs({ N: Math.round(adjustedN), P: Math.round(adjustedP), K: Math.round(adjustedK), ph: parseFloat(baseParams.ph.toFixed(1)) });
    setWeatherAdjustments(adjustments);
  };

  const getWeatherAndRegionAndAdjust = async (lat, lon) => {
    setLoading(true);
    try {
      const regionInfo = await determineRegionFromLocation(lat, lon);
      const weather = await fetchWeatherData(lat, lon);
      if (weather) { setWeatherData(weather); adjustSoilParametersBasedOnWeather(weather, originalSoilParams); }
      return { weather, regionInfo };
    } finally { setLoading(false); }
  };

  const generateHistoricalData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setHistoricalData(months.map((month, i) => ({
      month, temperature: 20 + Math.sin(i) * 10 + Math.random() * 5,
      rainfall: 50 + Math.cos(i) * 30 + Math.random() * 20,
      humidity: 60 + Math.sin(i * 0.5) * 20 + Math.random() * 10,
      predictions: Math.floor(50 + Math.random() * 100)
    })));
  };

  const generateCropPerformanceData = () => {
    setCropPerformance(['Rice', 'Maize', 'Wheat', 'Soybean', 'Cotton', 'Sugarcane'].map(crop => ({
      name: crop, successRate: 60 + Math.random() * 35, yield: 2000 + Math.random() * 3000,
      profitability: 1000 + Math.random() * 5000, confidence: 70 + Math.random() * 25
    })));
  };

  const generateSoilTrends = () => {
    setSoilTrends(Array.from({ length: 12 }, (_, i) => ({
      month: i + 1, nitrogen: 80 + Math.sin(i) * 20 + Math.random() * 10,
      phosphorus: 60 + Math.cos(i * 0.8) * 15 + Math.random() * 10,
      potassium: 70 + Math.sin(i * 1.2) * 25 + Math.random() * 10,
      ph: 6.5 + Math.sin(i * 0.5) * 0.5 + Math.random() * 0.3
    })));
  };

  useEffect(() => {
    generateHistoricalData(); generateCropPerformanceData(); generateSoilTrends();
    addNotification("Welcome back! Your soil health score is looking good today.", "info");
  }, []);

  const addNotification = (message, type) => {
    const newNotification = { id: Date.now(), message, type, timestamp: new Date().toLocaleTimeString() };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== newNotification.id)), 5000);
  };

  const getLocationName = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=9634574db1da4be795f9c715feea20af&language=en&pretty=1&no_annotations=1`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const comp = data.results[0].components;
        const village = comp.village || comp.hamlet || comp.suburb;
        const city = comp.city || comp.town || comp.city_district;
        const district = comp.state_district;
        const state = comp.state;
        const addressParts = [village || city, city && village ? city : null, district && !city ? district : null, state].filter(Boolean);
        if (village) setLocationAccuracy("high"); else if (city) setLocationAccuracy("medium"); else setLocationAccuracy("low");
        return addressParts.join(', ');
      }
    } catch (error) { console.error("OpenCage error:", error); }
    setLocationAccuracy("low");
    return `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setError("📍 Fetching your location and weather data...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const accuracy = position.coords.accuracy;
          setLocation({ lat, lon });
          const locationName = await getLocationName(lat, lon);
          setAddress(locationName); setSearchQuery(locationName);
          const { weather, regionInfo } = await getWeatherAndRegionAndAdjust(lat, lon);
          let accuracyMsg = accuracy < 50 ? "📍 High accuracy location detected! (±10m)" : accuracy < 100 ? "📍 Good accuracy location detected (±50m)" : "📍 Low accuracy location";
          const regionText = regionInfo?.region ? ` (${regionInfo.region.toUpperCase()} region)` : '';
          setError(`${accuracyMsg} Location: ${locationName}${regionText}`);
          setTimeout(() => setError(null), 5000);
          addNotification(`Location set to: ${locationName}${regionText}`, "success");
        },
        (err) => {
          let msg = "Unable to get your location. ";
          if (err.code === err.PERMISSION_DENIED) msg += "Please enable location permissions.";
          else if (err.code === err.POSITION_UNAVAILABLE) msg += "Location information unavailable.";
          else if (err.code === err.TIMEOUT) msg += "Location request timed out.";
          else msg += "Please enter coordinates manually.";
          setError(msg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else { setError("Geolocation is not supported by your browser."); }
  };

  const handleNumberInput = (setter, field, value, defaultValue = 0) => {
    if (value === "") setter(prev => ({ ...prev, [field]: defaultValue }));
    else { const num = parseFloat(value); if (!isNaN(num)) setter(prev => ({ ...prev, [field]: num })); }
  };

  const resetSoilParameters = () => {
    const defaultParams = { N: 95, P: 74, K: 50, ph: 6.0 };
    setOriginalSoilParams(defaultParams); setManualInputs(defaultParams);
    setWeatherAdjustments([]);
    setError("Soil parameters reset to default values.");
    setTimeout(() => setError(null), 3000);
    addNotification("Soil parameters reset to default values", "info");
  };

  const getSoilInfo = (N, P, K, ph) => {
    if (ph < 6) return { type: "Acidic Soil", color: "Red", description: "Low pH soil. Consider adding lime to raise pH levels.", recommendation: "Add agricultural lime to neutralize acidity", image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Soil_Auroville.JPG" };
    if (ph > 7.5) return { type: "Alkaline Soil", color: "Light Brown", description: "High pH soil. Add organic matter to improve soil structure.", recommendation: "Add compost, manure, or sulfur to lower pH", image: "https://www.richgro.com.au/app/uploads/2023/05/alkaline-1024x682.jpg" };
    if (N > 80 && P > 60 && K > 40) return { type: "Fertile Soil", color: "Dark / Black", description: "Excellent soil conditions for most crops.", recommendation: "Maintain with balanced fertilization", image: "https://media.istockphoto.com/id/1674128921/photo/fertile-soil-background.jpg?s=1024x1024&w=is&k=20&c=yjcbBYq41lSDGDq895NyD60Yhd28V9LOTnXVix6kh3U=" };
    if (N < 40) return { type: "Nitrogen-Deficient Soil", color: "Yellowish Brown", description: "Low nitrogen levels. Add nitrogen-rich fertilizers.", recommendation: "Apply urea, compost, or grow legumes as green manure", image: "https://images.pexels.com/photos/216692/pexels-photo-216692.jpeg" };
    if (P < 40) return { type: "Phosphorus-Deficient Soil", color: "Reddish Brown", description: "Low phosphorus levels. Add phosphorus-rich fertilizers.", recommendation: "Apply bone meal or rock phosphate", image: "https://i.pinimg.com/1200x/da/c7/85/dac7851c1f5ea19f199d2c84e49b2d1e.jpg" };
    if (K < 40) return { type: "Potassium-Deficient Soil", color: "Brown", description: "Low potassium levels. Add potassium-rich fertilizers.", recommendation: "Apply wood ash or potassium sulfate", image: "https://i.pinimg.com/1200x/da/c7/85/dac7851c1f5ea19f199d2c84e49b2d1e.jpg" };
    return { type: "Moderate Soil", color: "Brown", description: "Average soil conditions. Balanced fertilization recommended.", recommendation: "Use balanced NPK fertilizer (10-10-10)", image: "https://i.pinimg.com/1200x/da/c7/85/dac7851c1f5ea19f199d2c84e49b2d1e.jpg" };
  };

  const getIrrigationAdvice = (weatherData, manualWeatherInputs) => {
    const temp = weatherData?.temperature || manualWeatherInputs.temperature;
    const rain = weatherData?.rainfall || manualWeatherInputs.rainfall;
    if (rain > 100) return { message: "No irrigation needed (rain expected)", type: "success", icon: CloudRain };
    if (temp > 35) return { message: "Irrigate immediately (high temperature)", type: "warning", icon: AlertCircle };
    if (temp > 25) return { message: "Moderate irrigation recommended", type: "info", icon: Droplet };
    return { message: "Light irrigation sufficient", type: "info", icon: Droplet };
  };

  const handlePredict = async () => {
    if (inputMode === "location" && (!location.lat || !location.lon)) { setError("Please select a location first"); return; }
    setLoading(true); setError(null);
    try {
      let recommendations;
      if (inputMode === "location") {
        const currentWeather = weatherData || await fetchWeatherData(location.lat, location.lon);
        const regionInfo = locationInfo.region ? locationInfo : await determineRegionFromLocation(location.lat, location.lon);
        recommendations = getLocationBasedRecommendations(currentWeather, manualInputs, regionInfo);
        if (!weatherData) setWeatherData(currentWeather);
      } else {
        recommendations = getLocationBasedRecommendations(
          { temperature: manualWeatherInputs.temperature, humidity: manualWeatherInputs.humidity, rainfall: manualWeatherInputs.rainfall },
          manualInputs, { climate: 'subtropical', suitableCrops: regionCropMap.default }
        );
      }
      setPredictions({ recommended: recommendations.recommended, confidence: recommendations.confidence, topCrops: recommendations.topCrops });
      setActiveTab("recommendation");
      addNotification(`🌾 Recommended: ${recommendations.recommended.toUpperCase()} with ${(recommendations.confidence * 100).toFixed(1)}% confidence`, "success");
    } catch (error) { setError(`Error making prediction: ${error.message}`); } finally { setLoading(false); }
  };

  const soilInfo = getSoilInfo(manualInputs.N, manualInputs.P, manualInputs.K, manualInputs.ph);
  const irrigationAdvice = getIrrigationAdvice(weatherData, manualWeatherInputs);
  const IrrigationIcon = irrigationAdvice.icon;
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec489a'];

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Predictions", value: userStats.totalPredictions, color: "emerald", Icon: Activity },
          { label: "Avg Confidence", value: `${userStats.averageConfidence}%`, color: "blue", Icon: Target },
          { label: "Soil Health Score", value: `${userStats.soilHealthScore}/100`, color: "yellow", Icon: Shield },
          { label: "Active Farms", value: 3, color: "purple", Icon: Users },
        ].map(({ label, value, color, Icon }) => (
          <div key={label} className={`bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-xl p-4 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-${color}-600 font-medium`}>{label}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
              </div>
              <div className={`w-10 h-10 bg-${color}-200 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <LineChart className="w-4 h-4 mr-2 text-emerald-600" />
              Soil Health Trends
            </h3>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="text-xs border rounded-lg px-2 py-1">
              <option value="week">Last 7 Days</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ReLineChart data={soilTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="nitrogen" stroke="#10b981" name="Nitrogen (ppm)" strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="phosphorus" stroke="#3b82f6" name="Phosphorus (ppm)" strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="potassium" stroke="#f59e0b" name="Potassium (ppm)" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="ph" stroke="#ef4444" name="pH Level" strokeWidth={2} />
            </ReLineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-emerald-600" />
            Top Crop Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart data={cropPerformance.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="successRate" fill="#10b981" name="Success Rate (%)" />
              <Bar dataKey="profitability" fill="#3b82f6" name="Profitability ($)" />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Prediction Accuracy", value: "94.2%", color: "indigo", Icon: Target },
          { label: "Avg Response Time", value: "1.2s", color: "green", Icon: Clock },
          { label: "Total Data Points", value: "12.5K", color: "orange", Icon: Database },
        ].map(({ label, value, color, Icon }) => (
          <div key={label} className={`bg-gradient-to-r from-${color}-50 to-${color}-100 rounded-xl p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm text-${color}-600`}>{label}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
              </div>
              <div className={`w-10 h-10 bg-${color}-200 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <LineChart className="w-4 h-4 mr-2 text-emerald-600" />
          Historical Prediction Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ReLineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="predictions" stroke="#10b981" name="Predictions Made" strokeWidth={2} />
            <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Avg Temperature (°C)" strokeWidth={2} />
            <Line type="monotone" dataKey="rainfall" stroke="#3b82f6" name="Rainfall (mm)" strokeWidth={2} />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(n => (
          <div key={n.id} className={`px-4 py-3 rounded-xl shadow-lg text-sm max-w-xs border ${
            n.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            n.type === 'warning' ? 'bg-orange-50 border-orange-200 text-orange-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>{n.message}</div>
        ))}
      </div>

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-xl">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">SmartFarming</span>
            </div>
            <div className="flex items-center space-x-1">
              {["recommendation", "dashboard", "analytics"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg transition-all capitalize text-sm ${activeTab === tab ? 'bg-emerald-50 text-emerald-600 font-semibold border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-sm font-medium text-emerald-600">AI-Powered Agriculture</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Smart Crop
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Recommendation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get location-specific crop suggestions based on your soil conditions and real-time weather data
          </p>
        </div>

        {locationInfo.region && (
          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">📍 Location Insights</p>
                <p className="text-sm text-gray-600 mt-1">
                  Region: <span className="font-medium capitalize">{locationInfo.region}</span> •
                  Climate: <span className="font-medium capitalize">{locationInfo.climate}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-semibold text-blue-700">🌤️ Weather-Adaptive & Location-Aware Recommendations</p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <span className="text-xs text-gray-600 whitespace-nowrap">Auto-adjust:</span>
              <button onClick={() => setAutoAdjustSoil(!autoAdjustSoil)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${autoAdjustSoil ? 'bg-emerald-600' : 'bg-gray-300'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoAdjustSoil ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {activeTab === "recommendation" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Input Parameters
                </h2>
              </div>
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-4 rounded-xl flex items-start bg-blue-50 border border-blue-200 text-blue-700">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Mode Toggle */}
                <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
                  <button onClick={() => setInputMode("location")}
                    className={`flex-1 py-2.5 px-4 rounded-lg transition-all text-sm ${inputMode === "location" ? "bg-white shadow-md text-emerald-600 font-medium" : "text-gray-600"}`}>
                    <MapPin className="w-4 h-4 inline mr-2" />Location Based
                  </button>
                  <button onClick={() => setInputMode("manual")}
                    className={`flex-1 py-2.5 px-4 rounded-lg transition-all text-sm ${inputMode === "manual" ? "bg-white shadow-md text-emerald-600 font-medium" : "text-gray-600"}`}>
                    Manual Input
                  </button>
                </div>

                {/* Location Mode */}
                {inputMode === "location" && (
                  <div className="mb-6 space-y-3">
                    <button onClick={getCurrentLocation}
                      className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-md text-sm font-medium">
                      <Navigation className="w-4 h-4 mr-2" />Use Current Location
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400 font-medium">OR SEARCH</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <div className="relative" ref={searchContainerRef}>
                      <div className={`flex items-center border rounded-xl bg-white transition-all duration-150 ${showDropdown && (suggestions.length > 0 || searchQuery.length >= 2) ? "border-emerald-400 ring-2 ring-emerald-100 rounded-b-none" : "border-gray-300 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100"}`}>
                        <div className="pl-3 pr-1 flex-shrink-0"><Search className="w-4 h-4 text-gray-400" /></div>
                        <input type="text" value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value); setFocusedSuggestionIdx(-1); }}
                          onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
                          onKeyDown={handleSearchKeyDown}
                          placeholder="Search village, city, or landmark..."
                          className="flex-1 px-2 py-3 outline-none text-sm bg-transparent min-w-0"
                          autoComplete="off" spellCheck={false}
                        />
                        {isSearching && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600 mr-2 flex-shrink-0" />}
                        {searchQuery && !isSearching && (
                          <button onClick={clearSearch} className="mr-2 flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors" tabIndex={-1}>
                            <X className="w-3 h-3 text-gray-600" />
                          </button>
                        )}
                      </div>
                      {showDropdown && searchQuery.length >= 2 && (
                        <div className="absolute left-0 right-0 z-20 bg-white border border-emerald-400 border-t-0 rounded-b-xl shadow-lg overflow-hidden">
                          {suggestions.length > 0 ? (
                            <>
                              {suggestions.map((s, idx) => (
                                <button key={idx}
                                  onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(s); }}
                                  onMouseEnter={() => setFocusedSuggestionIdx(idx)}
                                  className={`w-full text-left px-4 py-3 flex items-start gap-3 border-b border-gray-100 last:border-b-0 transition-colors ${focusedSuggestionIdx === idx ? "bg-emerald-50" : "hover:bg-gray-50"}`}>
                                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-sm font-medium text-gray-800">{getSuggestionLabel(s)}</span>
                                      <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium flex-shrink-0">{getSuggestionType(s)}</span>
                                      {s.confidence >= 8 && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium flex-shrink-0">Best match</span>}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5 truncate">{s.formatted}</p>
                                  </div>
                                </button>
                              ))}
                              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-3">
                                {[["↑↓", "navigate"], ["Enter", "select"], ["Esc", "close"]].map(([k, v]) => (
                                  <span key={k} className="flex items-center gap-1 text-xs text-gray-400">
                                    <kbd className="bg-white border border-gray-200 rounded px-1 py-0.5 font-mono text-xs">{k}</kbd>{v}
                                  </span>
                                ))}
                              </div>
                            </>
                          ) : !isSearching ? (
                            <div className="px-4 py-5 text-center">
                              <Search className="w-5 h-5 text-gray-300 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">No locations found for "<span className="font-medium">{searchQuery}</span>"</p>
                              <p className="text-xs text-gray-400 mt-1">Try a different spelling or nearby landmark</p>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                    {location.lat && location.lon && (
                      <div className="p-3 rounded-xl border bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                        <div className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0 animate-pulse" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 text-sm">📍 Selected Location</p>
                            <p className="text-sm text-gray-700 mt-0.5 truncate">{address}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{location.lat.toFixed(5)}°N, {location.lon.toFixed(5)}°E</p>
                          </div>
                          {locationAccuracy && (
                            <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${locationAccuracy === 'high' ? 'bg-green-100 text-green-700' : locationAccuracy === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                              {locationAccuracy === 'high' ? '●' : locationAccuracy === 'medium' ? '◐' : '○'} {locationAccuracy}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Manual Mode */}
                {inputMode === "manual" && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Sun className="w-4 h-4 mr-2 text-emerald-600" />
                      Weather Parameters
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[{ label: "Temperature (°C)", key: "temperature" }, { label: "Humidity (%)", key: "humidity" }, { label: "Rainfall (mm)", key: "rainfall" }].map(({ label, key }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                          <input type="number" step="0.1" value={manualWeatherInputs[key]}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              const newW = { ...manualWeatherInputs, [key]: val };
                              setManualWeatherInputs(newW);
                              if (autoAdjustSoil) adjustSoilParametersBasedOnWeather(newW, originalSoilParams);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soil Parameters */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-emerald-600" />
                      Soil Parameters
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setInputType(inputType === "slider" ? "numeric" : "slider")}
                        className="text-xs flex items-center px-2 py-1 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
                        {inputType === "slider" ? <><Edit3 className="w-3 h-3 mr-1" />Numeric</> : <><Sliders className="w-3 h-3 mr-1" />Slider</>}
                      </button>
                      <button onClick={resetSoilParameters} className="text-xs flex items-center px-2 py-1 bg-gray-100 rounded-lg text-emerald-600 hover:bg-gray-200">
                        <RefreshCw className="w-3 h-3 mr-1" />Reset
                      </button>
                    </div>
                  </div>
                  {inputType === "slider" ? (
                    <div className="space-y-4">
                      {[
                        { label: "Nitrogen (N)", key: "N", min: 0, max: 200, unit: "ppm" },
                        { label: "Phosphorus (P)", key: "P", min: 0, max: 150, unit: "ppm" },
                        { label: "Potassium (K)", key: "K", min: 0, max: 300, unit: "ppm" },
                        { label: "pH Level", key: "ph", min: 0, max: 14, step: 0.1, unit: "" },
                      ].map(({ label, key, min, max, step = 1, unit }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {label} - {key === 'ph' ? manualInputs[key].toFixed(1) : manualInputs[key]} {unit}
                          </label>
                          <input type="range" min={min} max={max} step={step} value={manualInputs[key]}
                            onChange={(e) => setManualInputs({ ...manualInputs, [key]: key === 'ph' ? parseFloat(e.target.value) : parseInt(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg accent-emerald-600"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { label: "Nitrogen (N) - ppm", key: "N", min: 0, max: 200, def: 95 },
                        { label: "Phosphorus (P) - ppm", key: "P", min: 0, max: 150, def: 74 },
                        { label: "Potassium (K) - ppm", key: "K", min: 0, max: 300, def: 50 },
                        { label: "pH Level", key: "ph", min: 0, max: 14, step: 0.1, def: 6.5 },
                      ].map(({ label, key, min, max, step = 1, def }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                          <input type="number" min={min} max={max} step={step} value={manualInputs[key]}
                            onChange={(e) => handleNumberInput(setManualInputs, key, e.target.value, def)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Soil Analysis */}
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Sprout className="w-4 h-4 mr-2 text-emerald-600" />
                    Soil Analysis
                  </h3>
                  <div className="flex items-start gap-4">
                    <img src={soilInfo.image} alt="soil" className="w-14 h-14 rounded-xl object-cover shadow-md flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800">{soilInfo.type}</p>
                      <p className="text-sm text-gray-600">Color: {soilInfo.color}</p>
                      <p className="text-xs text-gray-500 mt-1">{soilInfo.description}</p>
                      <p className="text-xs text-emerald-600 mt-2 font-medium">💡 {soilInfo.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Weather Display */}
                {weatherData && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <CloudRain className="w-4 h-4 mr-2 text-blue-600" />
                      Current Weather Data
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { Icon: Thermometer, color: "text-red-500", value: `${weatherData.temperature.toFixed(1)}°C`, label: "Temperature" },
                        { Icon: Droplets, color: "text-blue-500", value: `${weatherData.humidity.toFixed(0)}%`, label: "Humidity" },
                        { Icon: CloudRain, color: "text-green-500", value: `${weatherData.rainfall.toFixed(1)}mm`, label: "Rainfall" },
                      ].map(({ Icon, color, value, label }) => (
                        <div key={label} className="bg-white p-3 rounded-xl text-center shadow-sm">
                          <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                          <div className="text-lg font-bold">{value}</div>
                          <div className="text-xs text-gray-500">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Irrigation Advice */}
                <div className={`mb-6 p-4 rounded-xl ${irrigationAdvice.type === "warning" ? "bg-orange-50" : "bg-green-50"}`}>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <IrrigationIcon className={`w-4 h-4 mr-2 ${irrigationAdvice.type === "warning" ? "text-orange-600" : "text-green-600"}`} />
                    Irrigation Recommendation
                  </h3>
                  <p className={`font-medium text-sm ${irrigationAdvice.type === "warning" ? "text-orange-700" : "text-green-700"}`}>
                    {irrigationAdvice.message}
                  </p>
                </div>

                <button onClick={handlePredict} disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center">
                  {loading
                    ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Analyzing...</>
                    : <><Search className="w-5 h-5 mr-2" />Get Location-Based Recommendation</>
                  }
                </button>
              </div>
            </div>

            {/* Results Panel */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  Crop Recommendations
                </h2>
              </div>
              <div className="p-6">
                {predictions ? (
                  <div className="space-y-6">
                    {/* Top Recommendation */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-emerald-200">
                      <h3 className="text-sm font-semibold text-emerald-600 mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        TOP RECOMMENDATION FOR YOUR REGION
                      </h3>
                      <div className="flex items-center mb-4">
                        <img
                          src={cropImages[predictions.recommended] || cropImages.rice}
                          alt={predictions.recommended}
                          className="w-20 h-20 rounded-2xl object-cover mr-4 shadow-lg"
                        />
                        <div>
                          <div className="text-3xl font-bold text-gray-800 capitalize">{predictions.recommended}</div>
                          <div className="flex items-center mt-1">
                            <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                            <span className="text-emerald-600 font-semibold">{(predictions.confidence * 100).toFixed(1)}% Suitability</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${predictions.confidence * 100}%` }} />
                      </div>
                    </div>

                    {/* Growth Stages — integrated directly in results panel */}
                    <GrowthStagesPanel cropName={predictions.recommended} />

                    {/* Alternative Options */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-emerald-600" />
                        Alternative Options
                      </h3>
                      <div className="space-y-3">
                        {predictions.topCrops.slice(1, 4).map((crop, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center">
                              <img src={cropImages[crop.name] || cropImages.rice} alt={crop.name} className="w-10 h-10 rounded-xl object-cover mr-3" />
                              <span className="font-medium text-gray-800 capitalize">{crop.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-700">{(crop.probability * 100).toFixed(1)}%</div>
                              <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-1.5 rounded-full" style={{ width: `${crop.probability * 100}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {weatherAdjustments.length > 0 && (
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                        <h3 className="font-semibold text-amber-800 mb-2 text-sm flex items-center">
                          <Info className="w-4 h-4 mr-2" />
                          Weather Adjustments Applied
                        </h3>
                        <ul className="text-xs text-amber-700 space-y-1">
                          {weatherAdjustments.map((adj, i) => <li key={i}>{adj}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                      <Sprout className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg mb-2">Ready to get recommendations?</p>
                    <p className="text-gray-400 text-sm">Select your location and get AI-powered crop suggestions tailored to your region</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeTab === "dashboard" ? (
          <DashboardView />
        ) : (
          <AnalyticsView />
        )}

        {/* Visual Gallery (with Growth Stages tab) */}
        {predictions && (
          <ImageRecommendationModule
            predictions={predictions}
            soilInfo={soilInfo}
            weatherData={weatherData}
            locationInfo={locationInfo}
            manualInputs={manualInputs}
          />
        )}

        {/* Feature Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { Icon: Sparkles, title: "Location-Aware AI", desc: "Advanced ML models that consider your specific region and climate" },
            { Icon: CloudRain, title: "Real-Time Weather Data", desc: "Integration with weather APIs for accurate location-specific weather" },
            { Icon: Eye, title: "Visual Recommendations", desc: "See crop images, soil visuals, growth stages and farming practices in action" },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm">
          Powered by Location-Aware AI • Weather data from OpenWeatherMap • For educational purposes
        </div>
      </div>
    </div>
  );
};

export default CropRecommendationApp;