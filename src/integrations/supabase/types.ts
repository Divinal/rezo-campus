export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      Articles: {
        Row: {
          article_id: number
          content: string | null
          created_at: string | null
          image_url: string | null
          logo_url: string | null
          title: string
        }
        Insert: {
          article_id?: number
          content?: string | null
          created_at?: string | null
          image_url?: string | null
          logo_url?: string | null
          title: string
        }
        Update: {
          article_id?: number
          content?: string | null
          created_at?: string | null
          image_url?: string | null
          logo_url?: string | null
          title?: string
        }
        Relationships: []
      }
      commentaires_proprietes: {
        Row: {
          auteur_email: string
          auteur_nom: string
          contenu: string
          cree_le: string | null
          id: number
          propriete_id: number | null
        }
        Insert: {
          auteur_email: string
          auteur_nom: string
          contenu: string
          cree_le?: string | null
          id?: never
          propriete_id?: number | null
        }
        Update: {
          auteur_email?: string
          auteur_nom?: string
          contenu?: string
          cree_le?: string | null
          id?: never
          propriete_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "property_comments_property_id_fkey"
            columns: ["propriete_id"]
            isOneToOne: false
            referencedRelation: "proprietes"
            referencedColumns: ["id"]
          },
        ]
      }
      Comments: {
        Row: {
          author: string | null
          content: string | null
          created_at: string | null
          id: number
          id_article: number | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          id_article?: number | null
        }
        Update: {
          author?: string | null
          content?: string | null
          created_at?: string | null
          id?: number
          id_article?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Comments_id_article_fkey"
            columns: ["id_article"]
            isOneToOne: false
            referencedRelation: "Articles"
            referencedColumns: ["article_id"]
          },
        ]
      }
      ContactMessages: {
        Row: {
          created_ad: string | null
          email: string | null
          id: number
          message: string | null
          name: string | null
          subject: string | null
          whatsapp: string | null
        }
        Insert: {
          created_ad?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
          subject?: string | null
          whatsapp?: string | null
        }
        Update: {
          created_ad?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string | null
          subject?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      foire_inscriptions: {
        Row: {
          adressemail: string
          created_at: string | null
          der_dip: string
          formation: string
          id: string
          nom: string
          pays: string
          prenom: string
          whatsapp: string
        }
        Insert: {
          adressemail: string
          created_at?: string | null
          der_dip: string
          formation: string
          id?: string
          nom: string
          pays: string
          prenom: string
          whatsapp: string
        }
        Update: {
          adressemail?: string
          created_at?: string | null
          der_dip?: string
          formation?: string
          id?: string
          nom?: string
          pays?: string
          prenom?: string
          whatsapp?: string
        }
        Relationships: []
      }
      Inscription: {
        Row: {
          AdresseMail: string | null
          date_ajout: string | null
          Der_Dip: string | null
          EcoleInteresse: string | null
          Formation: string | null
          id: number
          Nom: string
          Pays: string | null
          Prenom: string | null
          WhatsApp: string | null
        }
        Insert: {
          AdresseMail?: string | null
          date_ajout?: string | null
          Der_Dip?: string | null
          EcoleInteresse?: string | null
          Formation?: string | null
          id?: number
          Nom: string
          Pays?: string | null
          Prenom?: string | null
          WhatsApp?: string | null
        }
        Update: {
          AdresseMail?: string | null
          date_ajout?: string | null
          Der_Dip?: string | null
          EcoleInteresse?: string | null
          Formation?: string | null
          id?: number
          Nom?: string
          Pays?: string | null
          Prenom?: string | null
          WhatsApp?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          sender_id: string
          texte: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          sender_id: string
          texte: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          sender_id?: string
          texte?: string
          user_id?: string
        }
        Relationships: []
      }
      proprietes: {
        Row: {
          adresse: string | null
          caracteristiques: Json | null
          chambres: number | null
          cree_le: string | null
          description: string | null
          email_contact: string | null
          id: number
          images: string[] | null
          prix: number
          quartier: string | null
          salles_bain: number | null
          surface: number | null
          telephone_contact: string | null
          titre: string
          type_offre: string
          type_propriete: string | null
          ville: string | null
          vues: number | null
        }
        Insert: {
          adresse?: string | null
          caracteristiques?: Json | null
          chambres?: number | null
          cree_le?: string | null
          description?: string | null
          email_contact?: string | null
          id?: never
          images?: string[] | null
          prix: number
          quartier?: string | null
          salles_bain?: number | null
          surface?: number | null
          telephone_contact?: string | null
          titre: string
          type_offre: string
          type_propriete?: string | null
          ville?: string | null
          vues?: number | null
        }
        Update: {
          adresse?: string | null
          caracteristiques?: Json | null
          chambres?: number | null
          cree_le?: string | null
          description?: string | null
          email_contact?: string | null
          id?: never
          images?: string[] | null
          prix?: number
          quartier?: string | null
          salles_bain?: number | null
          surface?: number | null
          telephone_contact?: string | null
          titre?: string
          type_offre?: string
          type_propriete?: string | null
          ville?: string | null
          vues?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          message: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          message?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          message?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_views: {
        Args: { property_id: number } | { property_id: string }
        Returns: number
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
