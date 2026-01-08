import { collections, dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

interface ChatLead {
  name: string;
  email: string;
  phone: string;
  carRegistration: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  engineSize: string;
  query: string;
  createdAt: Date;
  status: string;
}

// POST - Create new chat lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const chatLead: ChatLead = {
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      carRegistration: body.carRegistration || '',
      vehicleMake: body.vehicleMake || '',
      vehicleModel: body.vehicleModel || '',
      vehicleYear: body.vehicleYear || '',
      engineSize: body.engineSize || '',
      query: body.query || '',
      createdAt: new Date(),
      status: 'New Lead'
    };

    const collection = await dbConnect(collections.chatLeads);
    const result = await collection.insertOne(chatLead as any);

    return NextResponse.json({
      success: true,
      message: "Chat lead saved successfully",
      data: { ...chatLead, _id: result.insertedId }
    }, { status: 201 });

  } catch (error) {
    console.error("Error saving chat lead:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to save chat lead",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// GET - Fetch all chat leads with pagination and search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    const collection = await dbConnect(collections.chatLeads);
    
    // Build filter
    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { carRegistration: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const total = await collection.countDocuments(filter);
    const data = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching chat leads:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch chat leads",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
