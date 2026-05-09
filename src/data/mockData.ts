export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  fees: number;
  feedback: string;
  avatar: string;
  experience: number;
  coordinates: { lat: number; lng: number };
}

export const doctors: Doctor[] = [
  { id: 1, name: "Dr. Aarav Mehta", specialization: "General Physician", location: "Mumbai", rating: 4.8, fees: 600, feedback: "Very thorough and caring doctor.", avatar: "AM", experience: 12, coordinates: { lat: 19.076, lng: 72.8777 } },
  { id: 2, name: "Dr. Vikram Iyer", specialization: "Cardiologist", location: "Delhi", rating: 4.9, fees: 1200, feedback: "Excellent heart specialist with great bedside manner.", avatar: "VI", experience: 18, coordinates: { lat: 28.6139, lng: 77.209 } },
  { id: 3, name: "Dr. Priya Sharma", specialization: "Dermatologist", location: "Bengaluru", rating: 4.7, fees: 800, feedback: "Helped clear my skin issues quickly.", avatar: "PS", experience: 8, coordinates: { lat: 12.9716, lng: 77.5946 } },
  { id: 4, name: "Dr. Rohan Kapoor", specialization: "Neurologist", location: "Mumbai", rating: 4.6, fees: 1500, feedback: "Knowledgeable and patient with explanations.", avatar: "RK", experience: 15, coordinates: { lat: 19.119, lng: 72.9051 } },
  { id: 5, name: "Dr. Ananya Nair", specialization: "Pediatrician", location: "Chennai", rating: 4.9, fees: 500, feedback: "Amazing with kids, very gentle approach.", avatar: "AN", experience: 10, coordinates: { lat: 13.0827, lng: 80.2707 } },
  { id: 6, name: "Dr. Arjun Reddy", specialization: "Orthopedic Surgeon", location: "Hyderabad", rating: 4.5, fees: 1800, feedback: "Fixed my knee issue completely.", avatar: "AR", experience: 20, coordinates: { lat: 17.385, lng: 78.4867 } },
  { id: 7, name: "Dr. Lisa Patel", specialization: "Pulmonologist", location: "Kolkata", rating: 4.8, fees: 900, feedback: "Great respiratory specialist.", avatar: "LP", experience: 14, coordinates: { lat: 22.5726, lng: 88.3639 } },
  { id: 8, name: "Dr. Devansh Joshi", specialization: "ENT Specialist", location: "Pune", rating: 4.7, fees: 700, feedback: "Resolved my chronic sinus problem.", avatar: "DJ", experience: 11, coordinates: { lat: 18.5204, lng: 73.8567 } },
];

export interface SymptomCondition {
  symptoms: string[];
  disease: string;
  description: string;
  severity: "low" | "medium" | "high";
  recommendation: string;
}

export const symptomConditions: SymptomCondition[] = [
  { symptoms: ["fever", "cough", "fatigue"], disease: "Common Flu", description: "Influenza is a viral infection that attacks your respiratory system.", severity: "medium", recommendation: "Rest, stay hydrated, and take over-the-counter flu medication. See a doctor if symptoms persist beyond 5 days." },
  { symptoms: ["fever", "headache", "body ache"], disease: "Viral Fever", description: "A viral fever caused by various viral infections with general body pain.", severity: "medium", recommendation: "Take rest, use fever-reducing medication, and drink plenty of fluids." },
  { symptoms: ["cough", "sore throat", "runny nose"], disease: "Common Cold", description: "A viral infection of your nose and throat (upper respiratory tract).", severity: "low", recommendation: "Rest, warm fluids, and OTC cold remedies should help within a week." },
  { symptoms: ["headache", "nausea", "sensitivity to light"], disease: "Migraine", description: "A neurological condition causing intense, debilitating headaches.", severity: "medium", recommendation: "Rest in a dark, quiet room. Take prescribed migraine medication. Consult a neurologist for recurring episodes." },
  { symptoms: ["chest pain", "shortness of breath", "dizziness"], disease: "Potential Cardiac Issue", description: "These symptoms may indicate a heart-related condition that needs immediate attention.", severity: "high", recommendation: "Seek immediate medical attention. Call emergency services if symptoms are severe." },
  { symptoms: ["fever", "rash", "joint pain"], disease: "Dengue Fever", description: "A mosquito-borne viral disease common in tropical regions.", severity: "high", recommendation: "Seek medical attention immediately. Stay hydrated and monitor platelet count." },
  { symptoms: ["stomach pain", "nausea", "vomiting"], disease: "Gastritis", description: "Inflammation of the stomach lining causing digestive discomfort.", severity: "medium", recommendation: "Avoid spicy foods, take antacids, and consult a gastroenterologist if persistent." },
  { symptoms: ["sneezing", "itchy eyes", "runny nose"], disease: "Allergic Rhinitis", description: "An allergic response causing cold-like symptoms triggered by allergens.", severity: "low", recommendation: "Use antihistamines, avoid known allergens, and keep your environment clean." },
  { symptoms: ["fatigue", "weight gain", "cold sensitivity"], disease: "Hypothyroidism", description: "A condition where the thyroid gland doesn't produce enough hormones.", severity: "medium", recommendation: "Get thyroid function tests done and consult an endocrinologist." },
  { symptoms: ["frequent urination", "excessive thirst", "fatigue"], disease: "Diabetes Indicators", description: "These symptoms may suggest elevated blood sugar levels.", severity: "high", recommendation: "Get blood sugar levels tested immediately. Consult an endocrinologist." },
];

export const availableSymptoms = [
  "fever", "cough", "headache", "fatigue", "body ache", "sore throat",
  "runny nose", "nausea", "vomiting", "dizziness", "chest pain",
  "shortness of breath", "rash", "joint pain", "stomach pain",
  "sneezing", "itchy eyes", "weight gain", "cold sensitivity",
  "frequent urination", "excessive thirst", "sensitivity to light",
];

export function predictDisease(symptoms: string[]): SymptomCondition | null {
  const lower = symptoms.map(s => s.toLowerCase().trim());
  let bestMatch: SymptomCondition | null = null;
  let bestScore = 0;

  for (const condition of symptomConditions) {
    const matchCount = condition.symptoms.filter(s => lower.includes(s)).length;
    const score = matchCount / condition.symptoms.length;
    if (score > bestScore && matchCount >= 2) {
      bestScore = score;
      bestMatch = condition;
    }
  }
  return bestMatch;
}
