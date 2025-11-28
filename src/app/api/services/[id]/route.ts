import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Define interfaces for your collections
interface Service {
  _id: ObjectId;
  name?: string;
  description: string;
  basePrice: string;
}


// GET — fetch services by ID
export async function GET(req: NextRequest) {
  try {
    const servicesCollection = await dbConnect(collections.services);
    const id = req.nextUrl.pathname.split("/").pop();
    const service = await servicesCollection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(service, { status: 200 });
    
  
  
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" }, 
      { status: 500 }
    );
  }
}

// PATCH — update service details
export async function PATCH(req: NextRequest) {
  try {
    const servicesCollection = await dbConnect(collections.services);
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const filter = { _id: new ObjectId(id) };
    const update = await req.json();
    const service = await servicesCollection.findOne(filter);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const updateDoc = {
      $set: {
          name: update.name,
          description: update.description,
          basePrice: update.basePrice,
          updatedAt: new Date()
      }
    };

    const result = await servicesCollection.updateOne(filter, updateDoc);
    return NextResponse.json({ message: "Service updated successfully", result }, { status: 200 });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE — delete service
export async function DELETE(req: NextRequest) {
  try {
    const servicesCollection = await dbConnect(collections.services);
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const filter = { _id: new ObjectId(id) };
    const result = await servicesCollection.deleteOne(filter);

    if (result.deletedCount > 0) {
      return NextResponse.json({ message: "Service deleted successfully", ...result }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Service not found or already deleted" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "An error occurred while deleting the service." }, { status: 500 });
  }
}
