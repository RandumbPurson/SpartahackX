// 'use client'
// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
// import { Button } from './ui/Button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
// import { Loader2, Copy, CheckCircle } from 'lucide-react';

// const LegislativeFeedback = () => {
//   const [state, setState] = useState('');
//   const [representative, setRepresentative] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [generatedEmail, setGeneratedEmail] = useState('');
//   const [copied, setCopied] = useState(false);

//   // Mock data for demo
//   const mockStates = ['California', 'New York', 'Texas'];
//   const mockRepresentatives = ['John Doe', 'Jane Smith', 'Bob Johnson'];
//   const mockDonorData = {
//     topDonors: ['Energy Corp', 'Tech Inc', 'Finance LLC'],
//     totalDonations: '$1.2M'
//   };

//   const handleGenerateEmail = async () => {
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setGeneratedEmail(
//         "Dear Representative,\n\nI am writing regarding your recent vote on..."
//       );
//       setLoading(false);
//     }, 1500);
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(generatedEmail);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     //<div className="bg-[url('/assets/img1.png')] ">
//     <div className="max-w-4xl py-20 mx-auto p-4 space-y-4 bg-opacity-20">
//       {/* Selection Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Generate Representative Feedback</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <label className="text-xl font-bold">Michigan State</label>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Select Representative</label>
//             <Select 
//               value={representative} 
//               onValueChange={setRepresentative}
//               disabled={!state}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Choose a representative" />
//               </SelectTrigger>
//               <SelectContent>
//                 {mockRepresentatives.map(r => (
//                   <SelectItem key={r} value={r}>{r}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Donor Information */}
//       {representative && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Donor Information</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <p className="text-sm font-medium">Top Donors:</p>
//               <ul className="list-disc pl-5">
//                 {mockDonorData.topDonors.map(donor => (
//                   <li key={donor} className="text-sm">{donor}</li>
//                 ))}
//               </ul>
//               <p className="text-sm mt-2">
//                 Total Donations: {mockDonorData.totalDonations}
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Email Generation */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Generated Email</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Button 
//             onClick={handleGenerateEmail} 
//             disabled={!representative || loading}
//             className="w-full bg-black text-white"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Generating...
//               </>
//             ) : (
//               'Generate Email'
//             )}
//           </Button>

//           {generatedEmail && (
//             <div className="space-y-2">
//               <div className="relative">
//                 <textarea 
//                   className="w-full h-48 p-3 border rounded-md" 
//                   value={generatedEmail}
//                   readOnly
//                 />
//                 <Button
//                   onClick={handleCopy}
//                   variant="outline"
//                   size="icon"
//                   className="absolute top-2 right-2"
//                 >
//                   {copied ? (
//                     <CheckCircle className="h-4 w-4" />
//                   ) : (
//                     <Copy className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//    // </div>
//   );
// };

// export default LegislativeFeedback;


'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Loader2, Copy, CheckCircle } from 'lucide-react';

const LegislativeFeedback = () => {
  const [state, setState] = useState('');
  const [representative, setRepresentative] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Mock data for demo
  const mockStates = ['California', 'New York', 'Texas'];
  const mockRepresentatives = ['John Doe', 'Jane Smith', 'Bob Johnson'];

  const mockDonorData = {
    topDonors: ['Energy Corp', 'Tech Inc', 'Finance LLC'],
    totalDonations: '$1.2M'
  };

  // Filter representatives based on search query
  const filteredRepresentatives = mockRepresentatives.filter((representative) =>
    representative.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateEmail = async () => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedEmail(
        "Dear Representative,\n\nI am writing regarding your recent vote on..."
      );
      setLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl py-20 mx-auto p-4 space-y-4 bg-opacity-20">
      {/* Selection Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Representative Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xl font-bold">Michigan State</label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Representative</label>
            {/* Add search input for filtering */}
            <input
              type="text"
              className="border-2 border-orange-500 p-2 rounded-md w-full mb-4"
              placeholder="Search for representative"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Select dropdown with filtered suggestions */}
            <Select 
              value={representative} 
              onValueChange={setRepresentative}
              disabled={!state}
              className="border-2 border-orange-500"
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a representative" />
              </SelectTrigger>
              <SelectContent>
                {filteredRepresentatives.length > 0 ? (
                  filteredRepresentatives.map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>No representatives found</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Donor Information */}
      {representative && (
        <Card>
          <CardHeader>
            <CardTitle>Donor Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm font-medium">Top Donors:</p>
              <ul className="list-disc pl-5">
                {mockDonorData.topDonors.map(donor => (
                  <li key={donor} className="text-sm">{donor}</li>
                ))}
              </ul>
              <p className="text-sm mt-2">
                Total Donations: {mockDonorData.totalDonations}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleGenerateEmail} 
            disabled={!representative || loading}
            className="w-full bg-black text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Email'
            )}
          </Button>

          {generatedEmail && (
            <div className="space-y-2">
              <div className="relative">
                <textarea 
                  className="w-full h-48 p-3 border rounded-md" 
                  value={generatedEmail}
                  readOnly
                />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LegislativeFeedback;
