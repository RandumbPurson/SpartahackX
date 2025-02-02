'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Loader2, Copy, CheckCircle } from 'lucide-react';

type repInfoType = {
  "rep-type": string;
  name: string;
  party: string;
  district: string;
  bills: {
    name: string;
    description: string;
    vote: string;
    result: string;
  }[]
} | undefined

function postSet(representative: string, endpoint: string, setter: Function) {
  if (representative == "") { return }
  fetch(`http://localhost:8080/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "name": representative })
  }).then((response) => response.json()).then((data) => {
    setter(data.payload)
  })
}

function nameFilter(repList: string[], searchQuery: string) {
  return repList.filter((representative: string) =>
    representative.toLowerCase().includes(searchQuery.toLowerCase())
  )
}

const LegislativeFeedback = () => {

  // repList/search state
  const [repList, setRepList] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [representative, setRepresentative] = useState('');

  // Load repList at startup
  useEffect(() => {
    fetch("http://localhost:8080/api/representativeList").then((response) => response.json().then((data) => {
      setRepList(data.reps)
    }))
  }, [])

  // Filter representatives based on search and zip query
  const filteredRepresentatives = useMemo(() => nameFilter(repList, searchQuery), [repList, searchQuery]);

  // Rep info/summary/email state
  const [repInfo, setRepInfo] = useState<repInfoType>(undefined);
  const [repSummary, setRepSummary] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [copied, setCopied] = useState(false);

  // On "representative" change, set info and summarry
  useEffect(() => {
    postSet(representative, "representativeInfo", setRepInfo)
    postSet(representative, "representativeSummary", setRepSummary)
  }, [representative])

  const handleGenerateEmail = async () => {
    setLoading(true);
    setTimeout(() => {
      postSet(representative, "representativeEmail", setGeneratedEmail)
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
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a representative" />
              </SelectTrigger>
              <SelectContent>
                {
                  filteredRepresentatives.map(r =>
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  )
                }
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Donor Information */}
      {representative && (
        <Card>
          <CardHeader>
            <CardTitle>Voting Information</CardTitle>
          </CardHeader>
          <CardContent>
            {
              repInfo == undefined ? null : (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{`${repInfo["rep-type"]} ${repInfo.name} (${repInfo.party})`}</p>
                  <ul className="list-disc pl-5">
                    {repInfo.bills.map(bill => (
                      <li key={bill.name} className="text-sm">{`${bill.name}: ${bill.vote} (${bill.result})`}</li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2">
                    {repSummary == undefined ? null : repSummary}
                  </p>
                </div>
              )
            }
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
