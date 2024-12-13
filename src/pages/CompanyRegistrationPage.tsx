import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyBasicInfoStep from '../components/registration/company/CompanyBasicInfoStep';
import CompanyContactInfoStep from '../components/registration/company/CompanyContactInfoStep';
import CompanyBusinessInfoStep from '../components/registration/company/CompanyBusinessInfoStep';
import CompanyPaymentInfoStep from '../components/registration/company/CompanyPaymentInfoStep';

const CompanyRegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    companyName: '',
    clientName: '',
    registrationNumber: '',
    ceoName: '',
    establishedDate: '',
    capital: '',
    employeeCount: '',
    industry: '',
    website: '',

    // Contact Info
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    buildingName: '',
    phoneNumber: '',
    
    // Business Info
    contactPerson: {
      name: '',
      department: '',
      position: '',
      phone: '',
      email: ''
    },
    budget: {
      min: 0,
      max: 0
    },
    targetGenres: [],
    targetDemographics: {
      ageGroups: [],
      gender: '',
      regions: []
    },
    pastExperience: '',
    productDescription: '',
    campaignObjectives: [],
    
    // Payment Info
    bankAccount: {
      bankName: '',
      branchName: '',
      accountType: '',
      accountNumber: '',
      accountHolder: ''
    },
    billingAddress: {
      postalCode: '',
      prefecture: '',
      city: '',
      address: '',
      buildingName: '',
      contactPerson: ''
    },
    platformUsagePurpose: '',
    notes: ''
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to submit registration
    console.log('Form submitted:', formData);
    navigate('/registration-complete');
  };

  const steps = [
    {
      title: '基本情報',
      description: '会社の基本情報'
    },
    {
      title: '所在地情報',
      description: '会社の所在地'
    },
    {
      title: 'ビジネス情報',
      description: '案件に関する情報'
    },
    {
      title: '支払い情報',
      description: '銀行口座・請求書'
    }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CompanyBasicInfoStep
            formData={formData}
            onChange={handleFieldChange}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <CompanyContactInfoStep
            formData={formData}
            onChange={handleFieldChange}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        );
      case 2:
        return (
          <CompanyBusinessInfoStep
            formData={formData}
            onChange={handleFieldChange}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        );
      case 3:
        return (
          <CompanyPaymentInfoStep
            formData={formData}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            onBack={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">企業アカウント登録</h1>
          <p className="text-center text-gray-600 mb-8">
            インフルエンサーとのマッチングを始めましょう
          </p>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex-1 relative"
                >
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-[50%] right-0 h-0.5 -translate-y-1/2 ${
                        index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                      style={{ width: '100%' }}
                    />
                  )}
                  
                  {/* Step Circle */}
                  <div className="text-center relative z-10">
                    <div
                      className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center bg-white border-2 ${
                        index <= currentStep 
                          ? 'border-purple-600 text-purple-600' 
                          : 'border-gray-200 text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="mt-2">
                      <div className="text-sm font-medium">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationPage;