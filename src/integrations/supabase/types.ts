export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessments: {
        Row: {
          actionplan: string | null
          assessmentid: number
          comments: string | null
          duedate: string | null
          evidence: string | null
          owner: string | null
          status: string
          subcategoryid: number
        }
        Insert: {
          actionplan?: string | null
          assessmentid?: number
          comments?: string | null
          duedate?: string | null
          evidence?: string | null
          owner?: string | null
          status: string
          subcategoryid: number
        }
        Update: {
          actionplan?: string | null
          assessmentid?: number
          comments?: string | null
          duedate?: string | null
          evidence?: string | null
          owner?: string | null
          status?: string
          subcategoryid?: number
        }
        Relationships: [
          {
            foreignKeyName: "assessments_subcategoryid_fkey"
            columns: ["subcategoryid"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["subcategoryid"]
          },
        ]
      }
      categories: {
        Row: {
          categoryid: number
          code: string
          description: string | null
          functionid: number
          name: string
          owner: string | null
        }
        Insert: {
          categoryid?: number
          code: string
          description?: string | null
          functionid: number
          name: string
          owner?: string | null
        }
        Update: {
          categoryid?: number
          code?: string
          description?: string | null
          functionid?: number
          name?: string
          owner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_functionid_fkey"
            columns: ["functionid"]
            isOneToOne: false
            referencedRelation: "functions"
            referencedColumns: ["functionid"]
          },
        ]
      }
      crossreferences: {
        Row: {
          ciscontrols: string | null
          crossrefid: number
          iso27001: string | null
          nist80053: string | null
          otherreferences: string | null
          owner: string | null
          subcategoryid: number
        }
        Insert: {
          ciscontrols?: string | null
          crossrefid?: number
          iso27001?: string | null
          nist80053?: string | null
          otherreferences?: string | null
          owner?: string | null
          subcategoryid: number
        }
        Update: {
          ciscontrols?: string | null
          crossrefid?: number
          iso27001?: string | null
          nist80053?: string | null
          otherreferences?: string | null
          owner?: string | null
          subcategoryid?: number
        }
        Relationships: [
          {
            foreignKeyName: "crossreferences_subcategoryid_fkey"
            columns: ["subcategoryid"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["subcategoryid"]
          },
        ]
      }
      functions: {
        Row: {
          code: string
          description: string | null
          functionid: number
          name: string
          owner: string | null
        }
        Insert: {
          code: string
          description?: string | null
          functionid?: number
          name: string
          owner?: string | null
        }
        Update: {
          code?: string
          description?: string | null
          functionid?: number
          name?: string
          owner?: string | null
        }
        Relationships: []
      }
      implementationexamples: {
        Row: {
          example: string
          implementationexampleid: number
          owner: string | null
          subcategoryid: number
        }
        Insert: {
          example: string
          implementationexampleid?: number
          owner?: string | null
          subcategoryid: number
        }
        Update: {
          example?: string
          implementationexampleid?: number
          owner?: string | null
          subcategoryid?: number
        }
        Relationships: [
          {
            foreignKeyName: "implementationexamples_subcategoryid_fkey"
            columns: ["subcategoryid"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["subcategoryid"]
          },
        ]
      }
      maturitylevels: {
        Row: {
          average_maturity: number | null
          description: string
          levelid: number
          levelname: string
          owner: string | null
        }
        Insert: {
          average_maturity?: number | null
          description: string
          levelid: number
          levelname: string
          owner?: string | null
        }
        Update: {
          average_maturity?: number | null
          description?: string
          levelid?: number
          levelname?: string
          owner?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          categoryid: number
          code: string
          description: string | null
          name: string
          owner: string | null
          subcategoryid: number
        }
        Insert: {
          categoryid: number
          code: string
          description?: string | null
          name: string
          owner?: string | null
          subcategoryid?: number
        }
        Update: {
          categoryid?: number
          code?: string
          description?: string | null
          name?: string
          owner?: string | null
          subcategoryid?: number
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_categoryid_fkey"
            columns: ["categoryid"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["categoryid"]
          },
        ]
      }
    }
    Views: {
      maturity_overall: {
        Row: {
          average_maturity: number | null
        }
        Relationships: []
      }
      vw_gap_list: {
        Row: {
          actionplan: string | null
          category_code: string | null
          control_name: string | null
          duedate: string | null
          function_code: string | null
          owner: string | null
          status: string | null
          subcategory_code: string | null
        }
        Relationships: []
      }
      vw_maturity_by_function: {
        Row: {
          function_code: string | null
          function_name: string | null
          levelid: number | null
          levelname: string | null
          total_controls: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      report_gaps_by_owner: {
        Args: { owner_filter: string }
        Returns: {
          function_code: string
          category_code: string
          subcategory_code: string
          control_name: string
          status: string
          action_plan: string
          due_date: string
        }[]
      }
      report_maturity_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          function_code: string
          total_controls: number
          implemented: number
          not_implemented: number
          partially_implemented: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
