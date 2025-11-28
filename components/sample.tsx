// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount, useReadContract } from "wagmi"
import { isAddress } from "viem"
import { useWillContract } from "@/hooks/useContract"
import { contractABI, contractAddress } from "@/lib/contract"

const SampleIntregation = () => {
  const { isConnected, address } = useAccount()

  // Add record form
  const [vin, setVin] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [ownerName, setOwnerName] = useState("")

  // Actions: mark/remove by index
  const [actionIndex, setActionIndex] = useState("")

  // Search by VIN
  const [searchVIN, setSearchVIN] = useState("")

  const { data, actions, state } = useWillContract()

  // Read record by VIN when searchVIN provided
  const { data: recordByVIN, isFetching: isFetchingRecord } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getRecordByVIN",
    args: searchVIN ? [searchVIN] : undefined,
    // wagmi will only call when args defined
  })

  const handleAddRecord = async () => {
    if (!vin || !make || !model || !year) return
    const numericYear = Number(year)
    if (!numericYear || numericYear < 1886) return // simple sanity check
    try {
      await actions.addRecord(vin, make, model, numericYear, ownerName || "")
      setVin("")
      setMake("")
      setModel("")
      setYear("")
      setOwnerName("")
    } catch (err) {
      console.error("Error adding record:", err)
    }
  }

  const handleMarkServiced = async () => {
    const idx = Number(actionIndex)
    if (isNaN(idx) || idx < 0) return
    try {
      await actions.markServiced(idx)
      setActionIndex("")
    } catch (err) {
      console.error("Error marking serviced:", err)
    }
  }

  const handleRemoveRecord = async () => {
    const idx = Number(actionIndex)
    if (isNaN(idx) || idx < 0) return
    try {
      await actions.removeRecord(idx)
      setActionIndex("")
    } catch (err) {
      console.error("Error removing record:", err)
    }
  }

  const canAdd =
    vin.trim() !== "" &&
    make.trim() !== "" &&
    model.trim() !== "" &&
    year.trim() !== "" &&
    !state.isLoading

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Vehicle Records</h2>
          <p className="text-muted-foreground">Please connect your wallet to interact with the contract.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Vehicle Records Contract</h1>
          <p className="text-muted-foreground text-sm mt-1">Add, manage and query vehicle records on-chain</p>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Contract Address</p>
            <p className="text-sm font-mono break-all text-foreground">{contractAddress}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Records Count</p>
            <p className="text-2xl font-semibold text-foreground">{data.recordsCount}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Contract Owner</p>
            <p className="text-sm font-mono break-all text-foreground">{data.owner ?? "—"}</p>
          </div>
        </div>

        {/* Add Record */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Add Vehicle Record</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="VIN"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
            <input
              type="text"
              placeholder="Make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
            <input
              type="text"
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
            <input
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min={1886}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg"
            />
            <input
              type="text"
              placeholder="Current Owner Name (optional)"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg md:col-span-2"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleAddRecord}
              disabled={!canAdd}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
            >
              {state.isLoading ? "Submitting..." : "Add Record"}
            </button>
          </div>
        </div>

        {/* Actions: Mark serviced / Remove */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Manage Records</h2>
          <p className="text-sm text-muted-foreground mb-3">Enter the record index (0-based) to perform actions.</p>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Record index"
              value={actionIndex}
              onChange={(e) => setActionIndex(e.target.value)}
              className="w-40 px-4 py-2 bg-background border border-border rounded-lg"
            />
            <button
              onClick={handleMarkServiced}
              disabled={state.isLoading || actionIndex === ""}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
            >
              Mark Serviced
            </button>
            <button
              onClick={handleRemoveRecord}
              disabled={state.isLoading || actionIndex === ""}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg disabled:opacity-50"
            >
              Remove Record
            </button>
          </div>
        </div>

        {/* Query by VIN */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Query Record by VIN</h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="VIN to search"
              value={searchVIN}
              onChange={(e) => setSearchVIN(e.target.value)}
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg"
            />
          </div>

          {searchVIN ? (
            isFetchingRecord ? (
              <p className="text-sm text-muted-foreground">Loading record...</p>
            ) : recordByVIN ? (
              <div className="text-sm font-mono">
                <p><strong>Index:</strong> {Number((recordByVIN as any)[0] as bigint)}</p>
                <p><strong>VIN:</strong> {(recordByVIN as any)[1]}</p>
                <p><strong>Make:</strong> {(recordByVIN as any)[2]}</p>
                <p><strong>Model:</strong> {(recordByVIN as any)[3]}</p>
                <p><strong>Year:</strong> {Number((recordByVIN as any)[4] as bigint)}</p>
                <p><strong>Owner Name:</strong> {(recordByVIN as any)[5]}</p>
                <p><strong>Created At (unix):</strong> {Number((recordByVIN as any)[6] as bigint)}</p>
                <p><strong>Serviced:</strong> {(recordByVIN as any)[7] ? "Yes" : "No"}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No record found for that VIN.</p>
            )
          ) : (
            <p className="text-sm text-muted-foreground">Enter a VIN to look up a record.</p>
          )}
        </div>

        {/* Status */}
        {state.hash && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Transaction Hash</p>
            <p className="text-sm font-mono text-foreground break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p className="text-sm text-primary">Waiting for confirmation...</p>}
            {state.isConfirmed && <p className="text-sm text-green-500">Transaction confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive-foreground">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
