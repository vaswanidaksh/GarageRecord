// hooks/useContract.ts
"use client"

import { useState, useEffect } from "react"
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface RecordData {
  vin: string
  make: string
  model: string
  year: number
  currentOwnerName: string
  createdAt: number
  serviced: boolean
}

export interface ContractData {
  recordsCount: number
  owner: `0x${string}` | null
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  addRecord: (
    vin: string,
    make: string,
    model: string,
    year: number,
    currentOwnerName: string
  ) => Promise<void>
  markServiced: (index: number) => Promise<void>
  removeRecord: (index: number) => Promise<void>
  changeOwner: (newOwner: `0x${string}`) => Promise<void>
}

export const useWillContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  // Read: records count
  const {
    data: recordsCountRaw,
    refetch: refetchRecordsCount,
    isFetching: isFetchingCount,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getRecordsCount",
  })

  // Read: owner
  const { data: ownerRaw, refetch: refetchOwner } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "owner",
  })

  // Write contract
  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  // Wait for tx confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      refetchRecordsCount()
      refetchOwner()
    }
  }, [isConfirmed, refetchRecordsCount, refetchOwner])

  const addRecord = async (
    vin: string,
    make: string,
    model: string,
    year: number,
    currentOwnerName: string
  ) => {
    if (!vin || !make || !model || !year) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "addRecord",
        args: [vin, make, model, BigInt(year), currentOwnerName],
      })
    } catch (err) {
      console.error("Error adding record:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const markServiced = async (index: number) => {
    if (index < 0) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "markServiced",
        args: [BigInt(index)],
      })
    } catch (err) {
      console.error("Error marking serviced:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const removeRecord = async (index: number) => {
    if (index < 0) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "removeRecord",
        args: [BigInt(index)],
      })
    } catch (err) {
      console.error("Error removing record:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const changeOwner = async (newOwner: `0x${string}`) => {
    if (!newOwner) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "changeOwner",
        args: [newOwner],
      })
    } catch (err) {
      console.error("Error changing owner:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const data: ContractData = {
    recordsCount: recordsCountRaw ? Number(recordsCountRaw as bigint) : 0,
    owner: ownerRaw ? (ownerRaw as `0x${string}`) : null,
  }

  const actions: ContractActions = {
    addRecord,
    markServiced,
    removeRecord,
    changeOwner,
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming || isFetchingCount,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  }

  return {
    data,
    actions,
    state,
  }
}
