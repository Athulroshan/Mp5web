import React from "react"
import { Card, CardContent } from "../components/ui/Card"
import { CheckCircle, Shield, Clock, FileText, Target, Users } from "lucide-react"

const InspectionPage: React.FC = () => {
  const isUnderDevelopment = false // set true if you want to hide this page

  if (isUnderDevelopment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-700">
          🚧 Inspection Page is under development 🚧
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Garment Inspection
          </h1>
          <p className="text-lg text-gray-600">
            Quality inspection is conducted after production is complete, 
            ensuring quality, compliance, and customer trust before shipment.
          </p>
        </div>

        {/* Inspection Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex flex-col items-center text-center p-6">
              <CheckCircle className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Each finished product is carefully inspected for defects, durability, 
                and customer requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex flex-col items-center text-center p-6">
              <Shield className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compliance Check</h3>
              <p className="text-gray-600">
                Inspections ensure garments meet safety, compliance, and international standards.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex flex-col items-center text-center p-6">
              <Clock className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">On-Time Verification</h3>
              <p className="text-gray-600">
                Inspections take place only after production ends, preventing shipment delays.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex flex-col items-center text-center p-6">
              <FileText className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-600">
                A complete inspection report is provided, covering defects, compliance, 
                and corrective actions.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex flex-col items-center text-center p-6">
              <Target className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
              <p className="text-gray-600">
                Our quality experts ensure accurate, unbiased inspection results.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardContent className="flex flex-col items-center text-center p-6">
              <Users className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Client Confidence</h3>
              <p className="text-gray-600">
                Buyers gain confidence knowing every garment batch is verified before delivery.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Video Section */}
        <div className="mt-16">
          <Card className="shadow-md rounded-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">How Our Inspection Process Works</h3>
                <p className="text-gray-600">Watch our video to understand the complete inspection workflow</p>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-4 text-center flex flex-col items-center">
                <div className="w-full max-w-2xl aspect-video mx-auto mb-4">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/nqYLv1cWL5Y"
                    title="Inspection Process Demonstration"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg w-full h-full"
                  ></iframe>
                </div>
                <p className="text-gray-500 text-lg">Video: Inspection Process Demonstration</p>
                <p className="text-gray-400 text-sm mt-2">Watch how our inspection process works in detail</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default InspectionPage
